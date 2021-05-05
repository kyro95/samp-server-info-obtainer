"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const samp_server_info_obtainer_1 = __importDefault(require("./samp-server-info-obtainer"));
async function doTest() {
    const test = await samp_server_info_obtainer_1.default.retriveInfo({
        ip: "193.70.42.229",
        port: 7777
    }, "i");
    console.log(test);
}
doTest();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEZBQXFEO0FBRXJELEtBQUssVUFBVSxNQUFNO0lBQ2pCLE1BQU0sSUFBSSxHQUFHLE1BQU0sbUNBQVUsQ0FBQyxXQUFXLENBQUM7UUFDdEMsRUFBRSxFQUFFLGVBQWU7UUFDbkIsSUFBSSxFQUFFLElBQUk7S0FDYixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRVIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDO0FBRUQsTUFBTSxFQUFFLENBQUMifQ==