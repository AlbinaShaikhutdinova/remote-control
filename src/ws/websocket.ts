import { createWebSocketStream, WebSocketServer, WebSocket, AddressInfo } from 'ws';
// @ts-ignore
import { moveLeft, moveRight, moveUp, moveDown, getPosition } from '../movement/mouse.ts';
// @ts-ignore
import { drawRectangle, drawCircle, printScreen } from '../movement/drawing.ts';

const wss = new WebSocketServer({ port: 8080 });

export const wsInit = () => wss.on('connection', (ws) => connection(ws));

function connection(ws: WebSocket) {
  const address = wss.address() as undefined as AddressInfo;
  console.log(`Started ws connection ${address.port}`);
  const duplex = createWebSocketStream(ws, {
    encoding: 'utf8',
    decodeStrings: false,
    defaultEncoding: 'utf8',
  });
  duplex.on('data', async (data) => {
    console.log('received:', data);
    const command = data.toString().split(' ')[0];
    const prop = data.toString().split(' ')[1] || '';
    switch (command) {
      case 'mouse_position':
        const position = await getPosition();
        const formatPosition = `${position.x}px,${position.y}px`;
        ws.send(`${command}_${formatPosition}`);
        break;
      case 'mouse_left':
        await moveLeft(Number(prop));
        ws.send(`${command}_${prop}`);
        break;
      case 'mouse_right':
        await moveRight(Number(prop));
        ws.send(`${command}_${prop}`);
        break;
      case 'mouse_up':
        await moveUp(Number(prop));
        ws.send(`${command}_${prop}`);
        break;
      case 'mouse_down':
        await moveDown(Number(prop));
        ws.send(`${command}_${prop}`);
        break;
      case 'draw_square':
        await drawRectangle(Number(prop), Number(prop));
        ws.send(`${command}_${prop}`);
        break;
      case 'draw_rectangle':
        const prop2 = data.toString().split(' ')[1];
        await drawRectangle(Number(prop), Number(prop2));
        ws.send(`${command}_${prop}_${prop2}`);
        break;
      case 'draw_circle':
        await drawCircle(Number(prop));
        ws.send(`${command}_${prop}`);
        break;
      case 'prnt_scrn':
        const img = await printScreen();
        ws.send(`prnt_scrn ${img.replace('data:image/png;base64,', '')}`);
        break;
    }
  });
}
