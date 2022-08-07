"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWebServer = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const constants_1 = require("../constants");
exports.app = (0, express_1.default)();
function startWebServer() {
    exports.app.get("/", (req, res) => {
        res.send("Hello World!");
    });
    exports.app.listen(constants_1.PORT, () => {
        console.log(`Example app listening on port ${constants_1.PORT}`);
    });
}
exports.startWebServer = startWebServer;
