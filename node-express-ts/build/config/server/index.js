"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const https = require("https");
const fs = require("fs");
const serverHandlers = require("./serverHandlers");
const server_1 = require("./server");
const httpsOption = {
    key: fs.readFileSync("./https/3094015_lmongo.com.key"),
    cert: fs.readFileSync("./https/3094015_lmongo.com.pem")
};
const Server = http.createServer(server_1.default);
const ServerHttps = https.createServer(httpsOption, server_1.default);
/**
 * Binds and listens for connections on the specified host
 */
Server.listen(server_1.default.get('port'));
ServerHttps.listen(443);
/**
 * Server Events
 */
Server.on('error', (error) => serverHandlers.onError(error, server_1.default.get('port')));
Server.on('listening', serverHandlers.onListening.bind(Server));
ServerHttps.on('error', (error) => serverHandlers.onError(error, 443));
ServerHttps.on('listening', serverHandlers.onListening.bind(ServerHttps));
//# sourceMappingURL=index.js.map