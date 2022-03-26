import * as dgram from "dgram";
import {IConnection} from "./interfaces/IConnection";
import {ISampData} from "./interfaces/ISampData";
import {ISampQuery} from "./interfaces/ISampQuery";

class SocketHandler {
    static socket: dgram.Socket = dgram.createSocket(`udp4`);

    validateConnection(connection: IConnection): boolean {
        return (!(!connection.ip.toString().match("^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$")
            || !connection.port.toString().match("^()([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])$")));
    }

    static async connect(connection: IConnection): Promise<void> {
        this.socket.bind();
        this.socket.connect(connection.port, connection.ip);
    }
}

class SampRetriever extends SocketHandler {
    socket: SocketHandler;

    constructor() {
        super();
    }

    static async fetch(connection: IConnection, opcode: string, callback?: Function): Promise<ISampData> {
        let response: ISampData;

        await this.connect({
            ip: connection.ip,
            port: connection.port
        }).then(async () => {
            response = await this.query(opcode);

            if(callback != undefined) {
                callback();
            }
        });

        return response;
    }

    private static async query(opcode: string): Promise<ISampData> {
        let query: ISampQuery = {
            response: {},
            offset: 0,
            connection: this.socket.address(),
            packet: new Buffer(0)
        };

        query.packet = Buffer.alloc(10 + opcode.length);
        query.packet.write('SAMP');

        for (let i = 0; i < 4; ++i) {
            query.packet[i + 4] = parseInt(query.connection.address.split('.')[i]);
        }

        query.packet[8] = query.connection.port & 255;
        query.packet[9] = query.connection.port >> 8 & 255;
        query.packet[10] = opcode.charCodeAt(0);

        this.socket.send(query.packet);

        await new Promise((resolve) => {
            this.socket.on('message', (message) => {
                resolve(message);
            });

        }).then((message: Buffer) => {
            this.socket.disconnect();

            switch(opcode) {
                case "i": {
                    query.response = {
                        passworded: !message.readUInt8(0),
                        players: message.readUInt16LE(12),
                        maxplayers: message.readUInt16LE(14),
                        hostname: message.slice(query.offset += 20, query.offset+= message.readUInt16LE(query.offset-4)).toString(),
                        gamemode: message.slice(query.offset += 4, query.offset += message.readUInt16LE(query.offset-4)).toString(),
                        language: message.slice(query.offset += 4).toString()
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

        return query.response;
    }
}

export default SampRetriever;