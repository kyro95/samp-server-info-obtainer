"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dgram = __importStar(require("dgram"));
class sampServer {
    static connectionMatch(connection) {
        if (!connection.ip.toString().match("^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$") || !connection.port.toString().match("^()([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])$")) {
            return false;
        }
        return true;
    }
    /**
    * Establishes a connection to the server.
    *
    * @param ip - parameter for binding the server ip.
    * @param port - parameter for binding the port.
    * @param callback function called when the connection is established (optional)
    */
    /*static async connect(connection: {ip :string , port: number}) {
        new Promise( (resolve, reject) => {
            if(!this.connectionMatch(connection)) {
                return reject(new Error(`Invalid connection match. (${connection.ip}:${connection.port})`));
            }
    
            this.socket.bind();
            resolve(this.socket.connect(connection.port, connection.ip));
        });
    }*/
    static async retriveInfo(connection, opcode) {
        let response;
        await this.connect({
            ip: connection.ip,
            port: connection.port
        }).then(async () => {
            response = await this.sendQuery(opcode);
        });
        return response;
    }
    static async connect(connection) {
        if (!this.connectionMatch(connection)) {
            new Error(`Invalid connection match. (${connection.ip}:${connection.port})`);
        }
        if (this.DEBUG_MODE) {
            console.log('[WARNING] samp server-info-obtainer has been launched on debug mode');
        }
        this.socket.bind();
        this.socket.connect(connection.port, connection.ip);
    }
    /**
     *
     * @param opcode - parameter for choosing which info you want to fetch.
     * @opcodes (Server info "i")
     * @returns an object that contains the info requested.
     */
    static async sendQuery(opcode) {
        let response;
        let offset = 0;
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
        }).then((message) => {
            this.socket.disconnect();
            if (this.DEBUG_MODE) { // QUERY DOC https://sampwiki.blast.hk/wiki/Query_Mechanism
                for (let i = 12; i < 29; i++) {
                    console.log(`Byte ${i}`);
                    console.log(message.readUInt8(i));
                }
            }
            switch (opcode) {
                case "i": {
                    response = {
                        passworded: !message.readUInt8(0),
                        players: message.readUInt16LE(12),
                        maxplayers: message.readUInt16LE(14),
                        hostname: message.slice(offset += 20, offset += message.readUInt16LE(offset - 4)).toString(),
                        gamemode: message.slice(offset += 4, offset += message.readUInt16LE(offset - 4)).toString(),
                        language: message.slice(offset += 4).toString()
                    };
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
sampServer.socket = dgram.createSocket(`udp4`);
sampServer.DEBUG_MODE = false;
exports.default = sampServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FtcC1zZXJ2ZXItaW5mby1vYnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zYW1wLXNlcnZlci1pbmZvLW9idGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUErQjtBQUUvQixNQUFNLFVBQVU7SUFJSixNQUFNLENBQUMsZUFBZSxDQUFDLFVBQXVDO1FBQ2xFLElBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyx5REFBeUQsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMscUZBQXFGLENBQUMsRUFBRTtZQUN2TixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7O01BTUU7SUFFRjs7Ozs7Ozs7O09BU0c7SUFFSCxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFzQyxFQUFFLE1BQWM7UUFDM0UsSUFBSSxRQUFpSixDQUFDO1FBRXRKLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLEVBQUUsRUFBRSxVQUFVLENBQUMsRUFBRTtZQUNqQixJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUk7U0FDNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNmLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBc0M7UUFDL0QsSUFBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDbEMsSUFBSSxLQUFLLENBQUMsOEJBQThCLFVBQVUsQ0FB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