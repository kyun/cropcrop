import React from 'react';
import styled from 'styled-components';

const CanvasWrapper = styled.div`
  position: relative;
`;
const Canvas = styled.canvas`
  //
  position: absolute;
  border: 1px solid red;
  cursor: crosshair;
  // background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
`;

const PADDING = 64;
const IMG = './Lenna.png';
const Cropper: React.FC<any> = () => {
  const canvasImageRef = React.useRef<HTMLCanvasElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const imageRef = React.useRef<HTMLImageElement | null>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  let pos = {
    isActive: false,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
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

    if (pos.startX >= maxX || pos.startY >= maxY) {
      const targetStartX = Math.min(pos.startX, maxX);
      const targetStartY = Math.min(pos.startY, maxY);
      const targetEndX = pos.endX - pos.startX;
      const targetEndY = pos.endY - pos.startY;
      console.log(targetStartX, targetStartY, targetEndX, targetEndY);
      context.fillRect(
        targetStartX,
        targetStartY,
        Math.max(targetEndX, size.width * -1),
        Math.max(targetEndY, size.height * -1)
      );
    } else if (pos.startX <= minX || pos.startY <= minY) {
      const targetStartX = Math.max(pos.startX, minX);
      const targetStartY = Math.max(pos.startY, minY);
      const targetEndX = pos.endX - pos.startX;
      const targetEndY = pos.endY - pos.startY;
      context.fillRect(
        targetStartX,
        targetStartY,
        Math.min(targetEndX, size.width),
        Math.min(targetEndY, size.height)
      );
    } else {
      const targetEndX = pos.endX - pos.startX;
      const targetEndY = pos.endY - pos.startY;
      console.log(
        Math.max(pos.startX, minX),
        Math.max(pos.startY, minY),
        Math.min(targetEndX, size.width - pos.startX + PADDING),
        Math.min(targetEndY, size.height - pos.startY + PADDING)
      );
      context.fillRect(
        Math.max(pos.startX, minX),
        Math.max(pos.startY, minY),
        Math.min(targetEndX, size.width - pos.startX + PADDING),
        Math.min(targetEndY, size.height - pos.startY + PADDING)
      );
    }
  };

  const handleMouseLeave = (e: any) => {
    if (!pos.isActive) return;
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, 512, 512);

    console.log(`>>`, e.nativeEvent.offsetX, e.nativeEvent.offsetY, pos);
    context.fillStyle = 'rgba(255,0,0,0.16)';
    pos.endX = e.nativeEvent.offsetX;
    pos.endY = e.nativeEvent.offsetY;
    pos.isActive = false;

    context.fillRect(
      pos.startX,
      pos.startY,
      pos.endX - pos.startX,
      pos.endY - pos.startY
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
      <CanvasWrapper>
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
    </div>
  );
};

export default Cropper;
