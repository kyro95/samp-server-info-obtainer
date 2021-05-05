/// <reference types="node" />
import * as dgram from "dgram";
declare class sampServer {
    static socket: dgram.Socket;
    static readonly DEBUG_MODE: boolean;
    private static connectionMatch;
    /**
    * Establishes a connection to the server.
    *
    * @param ip - parameter for binding the server ip.
    * @param port - parameter for binding the port.
    * @param callback function called when the connection is established (optional)
    */
    static retriveInfo(connection: {
        ip: string;
        port: number;
    }, opcode: string): Promise<{
        passworded?: boolean;
        players?: number;
        maxplayers?: number;
        hostname?: string;
        gamemode?: string;
        language?: string;
        rules?: string[];
    }>;
    private static connect;
    /**
     *
     * @param opcode - parameter for choosing which info you want to fetch.
     * @opcodes (Server info "i")
     * @returns an object that contains the info requested.
     */
    private static sendQuery;
}
export default sampServer;
