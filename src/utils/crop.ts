import { between } from './number';

export function getRectagle(
  canvas: HTMLCanvasElement,
  startX: number,
  startY: number,
  endX: number,
  endY: number
) {
  const minX = 0;
  const minY = 0;
  const maxX = canvas.width;
  const maxY = canvas.height;
  const width = endX - startX;
  const height = endY - startY;
  let x = 0,
    y = 0,
    w = 0,
    h = 0;
  x = startX > endX ? Math.min(startX, maxX) : Math.max(startX, minX);
  y = startY > endY ? Math.min(startY, maxY) : Math.max(startY, minY);
  w =
    startX > endX
      ? Math.max(width, (x - minX) * -1)
      : Math.min(width, (x - maxX) * -1);
  h =
    startY > endY
      ? Math.max(height, (y - minY) * -1)
      : Math.min(height, (y - maxY) * -1);

  return {
    x,
    y,
    width: w,
    height: h,
  };
}

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}
export function isInRect(rect: Rectangle, x: number, y: number) {
  console.log(rect, x, y);
  return between(x, rect.x, rect.width) && between(y, rect.y, rect.height);
}
