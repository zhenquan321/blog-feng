"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const serverHandlers = require("./serverHandlers");
const server_1 = require("./server");
const Server = http.createServer(server_1.default);
/**
 * Binds and listens for connections on the specified host
 */
Server.listen(server_1.default.get('port'));
/**
 * Server Events
 */
Server.on('error', (error) => serverHandlers.onError(error, server_1.default.get('port')));
Server.on('listening', serverHandlers.onListening.bind(Server));
Server.on('exit', (code) => {
    console.log('About to exit with code: ' + JSON.stringify(code));
});
//# sourceMappingURL=index.js.map