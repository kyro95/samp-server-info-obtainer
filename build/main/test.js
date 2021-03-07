"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const samp_server_info_obtainer_1 = __importDefault(require("./samp-server-info-obtainer"));
samp_server_info_obtainer_1.default.connect({
    ip: "yourip",
    port: 7777
}, myFunction);
async function myFunction() {
    console.log('Callback called!');
    const test = await samp_server_info_obtainer_1.default.getInfo("i");
    console.log(test);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEZBQXFEO0FBRXJELG1DQUFVLENBQUMsT0FBTyxDQUFDO0lBQ2YsRUFBRSxFQUFFLFFBQVE7SUFDWixJQUFJLEVBQUUsSUFBSTtDQUNiLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFFZixLQUFLLFVBQVUsVUFBVTtJQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFFaEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxtQ0FBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==