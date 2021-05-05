import * as dgram from "dgram";

class sampServer {
    static socket: dgram.Socket = dgram.createSocket(`udp4`);
    static readonly DEBUG_MODE: boolean = false;
    
    private static connectionMatch(connection: {ip : string, port: number}) {   
        if(!connection.ip.toString().match("^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$") || !connection.port.toString().match("^()([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])$")) {
            return false;
        }

        return true;
    }
    
    /**
     * @param connection - an object which contains the ip and the port to send the query for.
     * @param opcode - parameter for choosing which info you want to fetch.
     * @opcodes (Server info "i") 
     * @returns an object that contains the info requested.
     */
   
    static async retriveInfo(connection: {ip: string, port: number}, opcode: string, callback?: Function) {
        let response: {passworded?: boolean, players?: number, maxplayers?:number, hostname?: string, gamemode?: string, language?: string, rules?: string[]};

        await this.connect({
            ip: connection.ip,
            port: connection.port
        }).then(async () => {
            response = await this.sendQuery(opcode);

            if(callback != undefined) {
                callback();
            }
        });

        return response;
    }

    private static async connect(connection: {ip: string, port: number}) {
        if(!this.connectionMatch(connection)) {
            new Error(`Invalid connection match. (${connection.ip}:${connection.port})`);
        }

        if(this.DEBUG_MODE) {
            console.log('[WARNING] samp server-info-obtainer has been launched on debug mode');
        }

        this.socket.bind();
        this.socket.connect(connection.port, connection.ip);
    }

    private static async sendQuery(opcode: string) {
        let response: {passworded?: boolean, players?: number, maxplayers?:number, hostname?: string, gamemode?: string, language?: string, rulesCount?: number, rules?: string[]};
        let offset: number = 0;

        let connection = this.socket.address();
        let packet = Buffer.alloc(10 + opcode.length);

        packet.write('SAMP');

        for (let i = 0; i < 4; ++i) {
            packet[i + 4] = parseInt(connection.address.split('.')[i]);
        }

        packet[8] = connection.port & 255;
        packet[9] = connection.port >> 8 & 255;
        packet[10] = opcode.charCodeAt(0);

        this.socket.send(packet);

        await new Promise((resolve) => {
            this.socket.on('message', (message) => {
                resolve(message);
            });
    
        }).then((message: Buffer) => {
            this.socket.disconnect(); 

            if(this.DEBUG_MODE) { // QUERY DOC https://sampwiki.blast.hk/wiki/Query_Mechanism
                for(let i = 12; i < 29; i++) {
                    console.log(`Byte ${i}`);
                    console.log(message.readUInt8(i));
                }
            }

            switch(opcode) {
                case "i": {
                    response = {
                        passworded: !message.readUInt8(0),
                        players: message.readUInt16LE(12),
                        maxplayers: message.readUInt16LE(14),
                        hostname: message.slice(offset += 20, offset+= message.readUInt16LE(offset-4)).toString(),
                        gamemode: message.slice(offset += 4, offset += message.readUInt16LE(offset-4)).toString(),
                        language: message.slice(offset += 4).toString()
                    }
                    break;
                }
                
                case "r": {
                    
                    break;
                }

                case "d": {
                    
                    break;
                }
            }
        });

        return response;
    }
}

export default sampServer;