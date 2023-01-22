import { mouse, Region, screen } from '@nut-tree/nut-js';
import Jimp from 'jimp';
export async function printScreen() {
  const areaWidth = 200;
  try {
    const { x, y } = await mouse.getPosition();
    const r = new Region(x - areaWidth / 2, y - areaWidth / 2, areaWidth, areaWidth);
    const buffer = await screen.grabRegion(r);
    const imgBuffer = await buffer.toRGB();
    const img = new Jimp({ data: imgBuffer.data, width: areaWidth, height: areaWidth });
    return await img.getBase64Async('image/png');
  } catch (err) {
    console.log(err);
    return '';
  }
}
