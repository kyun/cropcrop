interface CropObj {
  isActive: boolean;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  x: number;
  y: number;
  w: number;
  h: number;
}
let pos: CropObj = {
  isActive: false,
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
  x: 0,
  y: 0,
  w: 0,
  h: 0,
};
const handleMouseDown = (e: any) => {
  //
};

const setCoords = (pos: CropObj) => {
  const { startX, startY, endX, endY } = pos;
  const width = endX - startX;
  const height = endY - startY;
  let x = 0,
    y = 0,
    w = 0,
    h = 0;

  // x = startX > endX ? Math.min(startX, maxX) : Math.max(startX, minX);
  // y = startY > endY ? Math.min(startY, maxY) : Math.max(startY, minY);
  // w =
  //   startX > endX
  //     ? Math.max(width, (x - minX) * -1)
  //     : Math.min(width, (x - maxX) * -1);
  // h =
  //   startY > endY
  //     ? Math.max(height, (y - minY) * -1)
  //     : Math.min(height, (y - maxY) * -1);
};
// const MouseDown = ()

export {};
