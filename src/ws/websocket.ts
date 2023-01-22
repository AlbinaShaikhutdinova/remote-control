import { createWebSocketStream, WebSocketServer, WebSocket, AddressInfo } from 'ws';
// @ts-ignore
import { moveLeft, moveRight, moveUp, moveDown, getPosition } from '../movement/mouse.ts';
// @ts-ignore
import { drawRectangle, drawCircle } from '../movement/drawing.ts';
// @ts-ignore
import { printScreen } from '../movement/printScreen.ts';
export const wss = new WebSocketServer({ port: 8080 });

export const wsInit = () => wss.on('connection', (ws) => connection(ws));

function connection(ws: WebSocket) {
  const address = wss.address() as undefined as AddressInfo;
  console.log(`Started ws connection on port ${address.port}`);
  const duplex = createWebSocketStream(ws, { decodeStrings: false });
  duplex.on('data', async (rawData) => {
    const data = rawData.toString();
    console.log('received:', data);
    const command = data.toString().split(' ')[0];
    const prop = data.toString().split(' ')[1] || '';
    switch (command) {
      case 'mouse_position':
        const position = await getPosition();
        const formatPosition = `${position.x},${position.y}`;
        duplex.write(`${command} ${formatPosition}`);
        break;
      case 'mouse_left':
        await moveLeft(Number(prop));
        duplex.write(`${command}_${prop}`);
        break;
      case 'mouse_right':
        await moveRight(Number(prop));
        duplex.write(`${command}_${prop}`);
        break;
      case 'mouse_up':
        await moveUp(Number(prop));
        duplex.write(`${command}_${prop}`);
        break;
      case 'mouse_down':
        await moveDown(Number(prop));
        duplex.write(`${command}_${prop}`);
        break;
      case 'draw_square':
        await drawRectangle(Number(prop), Number(prop));
        duplex.write(`${command}_${prop}`);
        break;
      case 'draw_rectangle':
        const prop2 = data.toString().split(' ')[2];
        await drawRectangle(Number(prop), Number(prop2));
        duplex.write(`${command}_${prop}_${prop2}`);
        break;
      case 'draw_circle':
        await drawCircle(Number(prop));
        duplex.write(`${command}_${prop}`);
        break;
      case 'prnt_scrn':
        const img = await printScreen();
        duplex.write(`prnt_scrn ${img.replace('data:image/png;base64,', '')}`);
        break;
    }
  });
}
