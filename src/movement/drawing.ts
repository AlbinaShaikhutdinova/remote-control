import {
  mouse,
  left,
  right,
  up,
  down,
  Button,
  straightTo,
  Point,
  Region,
  screen,
} from '@nut-tree/nut-js';
import Jimp from 'jimp';
export async function drawRectangle(height: number, width: number) {
  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(width));
  await mouse.move(down(height));
  await mouse.move(left(width));
  await mouse.move(up(height));
  await mouse.releaseButton(Button.LEFT);
}
export async function drawCircle(radius: number) {
  mouse.config.mouseSpeed = 1000;
  const { x, y } = await mouse.getPosition();
  const amountOfPoints = 36;
  const drawPoint = async (t: number) => {
    const newX = x + radius * Math.sin(t);
    const newY = y - radius + radius * Math.cos(t);
    await mouse.drag(straightTo(new Point(newX, newY)));
  };
  for (let i = 0; i < Math.PI * 2; i += (Math.PI * 2) / amountOfPoints) {
    await drawPoint(i);
  }
  mouse.config.mouseSpeed = 200;
}
export async function printScreen() {
  try {
    const { x, y } = await mouse.getPosition();
    const r = new Region(x, y, 200, 200);
    const buffer = await screen.grabRegion(r);
    const imgBuffer = await buffer.toRGB();
    const img = new Jimp({ data: imgBuffer.data, width: 200, height: 200 }); // await Jimp.read(Buffer.from(buffer.data));
    return await img.getBase64Async('image/png');
  } catch (err) {
    console.log(err);
    return '';
  }
}
