import {ISampData} from "./ISampData";
import {AddressInfo} from "net";

export interface ISampQuery {
    response: ISampData;
    offset: number;
    connection: AddressInfo;
    packet: Buffer;
}

