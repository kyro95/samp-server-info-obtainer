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
    static sendQuery(opcode) {
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
    }
    /**
    * Establishes a connection to the server.
    *
    * @param ip - parameter for binding the server ip.
    * @param port - parameter for binding the port.
    * @param callback function called when the connection is established (optional)
    */
    static connect(connection, callback) {
        new Promise((resolve, reject) => {
            if (!this.connectionMatch(connection)) {
                return reject(new Error(`Invalid connection match. (${connection.ip}:${connection.port})`));
            }
            this.socket.bind();
            this.socket.connect(connection.port, connection.ip);
            resolve(console.log(`🗺️‎  samp-server-obtainer — A simple library made in typescript for obtaining your samp server info\nhttps://github.com/kyro95/samp-server-info-obtainer\n`));
        }).then(() => {
            if (callback != undefined) {
                callback();
            }
        });
    }
    /**
     *
     * @param opcode - parameter for choosing which info you want to fetch.
     * @opcodes (Server info "i")
     * @returns an object that contains the info requested.
     */
    static async getInfo(opcode) {
        let response;
        let offset = 0;
        this.sendQuery(opcode);
        await new Promise((resolve) => {
            this.socket.on('message', (message) => {
                resolve(message);
            });
        }).then((message) => {
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
                case "r": { // Still under development
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
sampServer.DEBUG_MODE = 0;
exports.default = sampServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FtcC1zZXJ2ZXItaW5mby1vYnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zYW1wLXNlcnZlci1pbmZvLW9idGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUErQjtBQUUvQixNQUFNLFVBQVU7SUFJSixNQUFNLENBQUMsZUFBZSxDQUFDLFVBQXVDO1FBQ2xFLElBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyx5REFBeUQsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMscUZBQXFGLENBQUMsRUFBRTtZQUN2TixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQWM7UUFDbkMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN2QyxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFOUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ3hCLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUQ7UUFFRCxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxDQUFDLENB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