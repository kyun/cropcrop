import React from 'react';
import styled from 'styled-components';
import { between } from '../utils/number';

const CanvasWrapper = styled.div<{ width?: number; height?: number }>`
  position: relative;
  ${({ width, height }) => {
    return `width: ${width}px; height: ${height}px;`;
  }}
`;
const Canvas = styled.canvas`
  position: absolute;
  border: 1px solid red;
  cursor: crosshair;
  background: rgba(0, 0, 0, 0.5);
  // background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
`;

const PADDING = 128;
const IMG = './Lenna.png';
const Cropper: React.FC<any> = () => {
  const canvasImageRef = React.useRef<HTMLCanvasElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const mycanvasRef = React.useRef<HTMLCanvasElement>(
    document.createElement('canvas')
  );
  const imageRef = React.useRef<HTMLImageElement | null>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  const [url, setUrl] = React.useState('');
  let pos = {
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
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext('2d');
    if (!context) return;
    pos.isActive = true;
    pos.startX = e.nativeEvent.offsetX;
    pos.startY = e.nativeEvent.offsetY;
  };
  const handleMouseUp = (e: any) => {
    //
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    pos.isActive = false;
    pos.endX = 0;
    pos.endY = 0;
    pos.startX = 0;
    pos.startY = 0;

    const { x, y, w, h } = pos;
    console.log(x, y, w, h);
    const mycanvas = mycanvasRef.current;
    const mycontext = mycanvas.getContext('2d');
    mycanvas.width = Math.abs(w);
    mycanvas.height = Math.abs(h);
    mycontext?.drawImage(
      imageRef.current as HTMLImageElement,
      x - PADDING,
      y - PADDING,
      w,
      h,
      0,
      0,
      Math.abs(w),
      Math.abs(h)
    );
    const url = mycanvasRef.current.toDataURL('image/png', 1.0);
    setUrl(url);
  };
  const handleMouseMove = (e: any) => {
    //

    if (!pos.isActive) return;
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext('2d');
    if (!context) return;
    const minX = PADDING;
    const minY = PADDING;
    const maxX = size.width + PADDING;
    const maxY = size.height + PADDING;
    context.clearRect(0, 0, 512, 512);
    context.fillStyle = 'rgba(255,0,0,0.48)';
    pos.endX = e.nativeEvent.offsetX;
    pos.endY = e.nativeEvent.offsetY;
    const { startX, startY, endX, endY } = pos;
    const width = endX - startX;
    const height = endY - startY;
    let x = 0,
      y = 0,
      w = 0,
      h = 0;
    if (startX > endX && startY > endY) {
      // 우에서 좌 && 아래서 위
      x = Math.min(startX, maxX);
      y = Math.min(startY, maxY);
      w = Math.max(width, (x - minX) * -1);
      h = Math.max(height, (y - minY) * -1);
      // ex 115 330 13 -160
    } else if (startX > endX && startY <= endY) {
      // 우에서 좌 && 위에서 아래
      x = Math.min(startX, maxX);
      y = Math.max(startY, minY);
      w = Math.max(width, (x - minX) * -1);
      h = Math.min(height, (y - maxY) * -1);
    } else if (startX <= endX && startY > endY) {
      // 좌에서 우 && 아래서 위
      x = Math.max(startX, minX);
      y = Math.min(startY, maxY);
      w = Math.min(width, (x - maxX) * -1);
      h = Math.max(height, (y - minY) * -1);
    } else if (startX <= endX && startY <= endY) {
      // 좌에서 우 && 아래서 위
      x = Math.max(startX, minX);
      y = Math.max(startY, minY);
      w = Math.min(width, (x - maxX) * -1);
      h = Math.min(height, (y - maxY) * -1);
    }
    // context.fillRect(x, y, w, h);
    context.strokeStyle = '#feca00';
    context.strokeRect(x, y, w, h);
    pos.x = x;
    pos.y = y;
    pos.w = w;
    pos.h = h;
    context.drawImage(
      imageRef.current as HTMLImageElement,
      x - PADDING,
      y - PADDING,
      w,
      h,
      x,
      y,
      w,
      h
    );
  };

  const handleMouseLeave = (e: any) => {
    if (!pos.isActive) return;
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, 512, 512);
    const minX = PADDING;
    const minY = PADDING;
    const maxX = size.width + PADDING;
    const maxY = size.height + PADDING;
    pos.endX = e.nativeEvent.offsetX;
    pos.endY = e.nativeEvent.offsetY;
    // pos.isActive = false;

    const { startX, startY, endX, endY } = pos;
    const width = endX - startX;
    const height = endY - startY;
    let x = 0,
      y = 0,
      w = 0,
      h = 0;
    if (startX > endX && startY > endY) {
      // 우에서 좌 && 아래서 위
      x = Math.min(startX, maxX);
      y = Math.min(startY, maxY);
      w = Math.max(width, (x - minX) * -1);
      h = Math.max(height, (y - minY) * -1);
      // ex 115 330 13 -160
    } else if (startX > endX && startY <= endY) {
      // 우에서 좌 && 위에서 아래
      x = Math.min(startX, maxX);
      y = Math.max(startY, minY);
      w = Math.max(width, (x - minX) * -1);
      h = Math.min(height, (y - maxY) * -1);
    } else if (startX <= endX && startY > endY) {
      // 좌에서 우 && 아래서 위
      x = Math.max(startX, minX);
      y = Math.min(startY, maxY);
      w = Math.min(width, (x - maxX) * -1);
      h = Math.max(height, (y - minY) * -1);
    } else if (startX <= endX && startY <= endY) {
      // 좌에서 우 && 아래서 위
      x = Math.max(startX, minX);
      y = Math.max(startY, minY);
      w = Math.min(width, (x - maxX) * -1);
      h = Math.min(height, (y - maxY) * -1);
    }
    // context.fillRect(x, y, w, h);
    context.strokeStyle = '#feca00';
    context.strokeRect(x, y, w, h);
    context.drawImage(
      imageRef.current as HTMLImageElement,
      x - PADDING,
      y - PADDING,
      w,
      h,
      x,
      y,
      w,
      h
    );
  };
  const handleImageLoad = () => {
    if (!imageRef.current) return;
    console.log(imageRef.current?.width);
    setSize({
      width: imageRef.current?.width,
      height: imageRef.current?.height,
    });
  };
  const drawImage = () => {
    if (!imageRef.current) return;

    if (!canvasImageRef.current) return;
    const context = canvasImageRef.current.getContext('2d');
    if (!context) return;
    console.log('ddd');
    context.drawImage(imageRef.current, PADDING, PADDING);
  };
  return (
    <div>
      <button onClick={drawImage}>draw</button>
      <img ref={imageRef} src={IMG} onLoad={handleImageLoad} />
      <CanvasWrapper
        width={size.width + PADDING + PADDING}
        height={size.height + PADDING + PADDING}
      >
        <Canvas
          ref={canvasImageRef}
          width={size.width + PADDING + PADDING}
          height={size.height + PADDING + PADDING}
        />
        <Canvas
          ref={canvasRef}
          width={size.width + PADDING + PADDING}
          height={size.height + PADDING + PADDING}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      </CanvasWrapper>
      <div>
        <img src={url} />
      </div>
    </div>
  );
};

export default Cropper;
