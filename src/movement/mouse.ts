import { mouse, left, right, up, down } from '@nut-tree/nut-js';
export async function moveRight(offset: number) {
  await mouse.move(right(offset));
}
export async function moveLeft(offset: number) {
  await mouse.move(left(offset));
}
export async function moveUp(offset: number) {
  await mouse.move(up(offset));
}
export async function moveDown(offset: number) {
  await mouse.move(down(offset));
}
export async function getPosition() {
  return await mouse.getPosition();
}
