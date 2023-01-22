// @ts-ignore
import { httpServer } from './src/http_server/index.ts';
// @ts-ignore
import { wsInit, wss } from './src/ws/websocket.ts';
import { mouse } from '@nut-tree/nut-js';

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
mouse.config.mouseSpeed = 200;
wsInit();

process.on('SIGINT', function () {
  console.log('Closing http and ws connection');
  wss.close();
  httpServer.close();
  process.exit();
});
