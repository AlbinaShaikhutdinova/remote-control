import { WebSocketServer } from 'ws';
// @ts-ignore
import { moveLeft, moveRight, moveUp, moveDown, getPosition } from '../movement/mouse.ts';
// @ts-ignore
import { drawRectangle, drawCircle } from '../movement/drawing.ts';
export const wss = new WebSocketServer({ port: 8080 });
export const wsInit = () => wss.on('connection', (ws) => connection(ws));

function connection(ws: {
  on: (arg0: string, arg1: (data: any) => void) => void;
  send: (arg0: string) => void;
}) {
  ws.on('message', async function message(data) {
    console.log('received: %s', data);
    const command = data.toString().split(' ')[0];
    const prop = data.toString().split(' ')[1] || '';
    let response = `${command}_${prop}px`;
    let prop2 = 0;
    if (command === 'draw_rectangle') {
      prop2 = data.toString().split(' ')[2];
      response = `${command}_${prop}px_${prop2}px`;
    }
    ws.send(response);
    switch (command) {
      case 'mouse_position':
        const position = await getPosition();
        console.log(position);
        //ws.send(position.toString());
        break;
      case 'mouse_left':
        await moveLeft(Number(prop));
        break;
      case 'mouse_right':
        await moveRight(Number(prop));
        break;
      case 'mouse_up':
        await moveUp(Number(prop));
        break;
      case 'mouse_down':
        await moveDown(Number(prop));
        break;
      case 'draw_square':
        await drawRectangle(Number(prop), Number(prop));
        break;
      case 'draw_rectangle':
        await drawRectangle(Number(prop), Number(prop2));
        break;
      case 'draw_circle':
        await drawCircle(Number(prop));
        break;
    }
  });
}
