import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import * as serverHandlers from './serverHandlers';
import server from './server';

const httpsOption = {
    // key : fs.readFileSync("./https/3094015_lmongo.com.key"),
    // cert: fs.readFileSync("./https/3094015_lmongo.com.pem")
    key : fs.readFileSync("./https/3094016_fengzq.cn.key"),
    cert: fs.readFileSync("./https/3094016_fengzq.cn.pem")
}

const Server: http.Server = http.createServer(server);
const ServerHttps: https.Server = https.createServer(httpsOption,server);

/**
 * Binds and listens for connections on the specified host
 */

Server.listen(server.get('port'));
ServerHttps.listen(443);

/**
 * Server Events
 */

Server.on('error',(error: Error) => serverHandlers.onError(error, server.get('port')));
Server.on('listening',serverHandlers.onListening.bind(Server));

ServerHttps.on('error',(error: Error) => serverHandlers.onError(error,443));
ServerHttps.on('listening',serverHandlers.onListening.bind(ServerHttps));

    