import { WebSocketServer } from 'ws';

export const wss = new WebSocketServer({ port: 8080 });
export const wsInit = () => wss.on('connection', (ws) => connection(ws));

function connection(ws: {
  on: (arg0: string, arg1: (data: any) => void) => void;
  send: (arg0: string) => void;
}) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
    const command = data.toString().split(' ')[0];
    const prop = data.toString().split(' ')[1];
    let response = `${command}_${prop}px`;
    if (command === 'draw_rectangle') {
      const prop2 = data.toString().split(' ')[2];
      response = `${command}_${prop}px_${prop2}px`;
    }

    ws.send(response);
    switch (command) {
      case 'mouse_left':
        ws.send('something');
    }
  });
}
