import React from 'react';
import styled from 'styled-components';

const CanvasWrapper = styled.div`
  position: relative;
`;
const Canvas = styled.canvas`
  position: absolute;
  border: 1px solid red;
  cursor: crosshair;
  // background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
`;

const PADDING = 128;
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

    console.log(pos);
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
    const { startX, startY, endX, endY } = pos;

    if (startX >= endX && startY >= endY) {
      //
      console.log('1');

      if (startX > maxX && startY > maxY) {
        //
        context.fillRect(
          Math.min(startX, size.width + PADDING),
          Math.min(startY, size.height + PADDING),
          Math.max((startX - endX) * -1, size.width * -1),
          Math.max((startY - endY) * -1, size.height * -1)
        );
      } else if (startX > maxX && startY <= maxY) {
        context.fillRect(
          Math.min(startX, size.width + PADDING),
          startY,
          Math.max((startX - endX) * -1, size.width * -1),
          Math.max((startY - PADDING) * -1, endY - startY)
        );
      } else if (startX <= maxX && startY > maxY) {
        context.fillRect(
          startX,
          Math.min(startY, size.height + PADDING),
          Math.max((startX - PADDING) * -1, endX - startX),
          Math.max((startY - endY) * -1, size.height * -1)
        );
      } else if (startX <= maxX && startY <= maxY) {
        context.fillRect(
          startX,
          startY,
          Math.max((startX - PADDING) * -1, endX - startX),
          Math.max((startY - PADDING) * -1, endY - startY)
        );
      }
    } else if (startX >= endX && startY < endY) {
      //
      console.log('2');
      if (startX > maxX && startY > maxY) {
        //
        console.log('a');
        context.fillRect(
          Math.min(startX, size.width + PADDING),
          Math.min(startY, size.height + PADDING),
          Math.max((startX - endX) * -1, size.width * -1),
          Math.max((startY - endY) * -1, size.height * -1)
        );
      } else if (startX > maxX && startY <= maxY) {
        console.log('b');
        const targetY = Math.max(startY, PADDING);
        context.fillRect(
          Math.min(startX, size.width + PADDING),
          targetY,
          Math.max((startX - endX) * -1, size.width * -1),
          Math.max((startY - PADDING) * -1, endY - startY)
        );
      } else if (startX <= maxX && startY > maxY) {
        console.log('c');

        context.fillRect(
          startX,
          Math.min(startY, size.height + PADDING),
          Math.max((startX - PADDING) * -1, endX - startX),
          Math.max((startY - endY) * -1, size.height * -1)
        );
      } else if (startX <= maxX && startY <= maxY) {
        console.log('d');
        const targetY = Math.max(startY, PADDING);
        console.log(endY - targetY, maxY);
        context.fillRect(
          startX,
          targetY,
          Math.max((startX - PADDING) * -1, endX - startX),
          Math.min(endY - targetY, size.height)
        );
      }
    } else if (startX < endX && startY >= endY) {
      //
      console.log('3');
    } else if (startX < endX && startY < endY) {
      //
      console.log('4');
    } else {
      console.log('Expe');
      console.log(pos);
    }

    // if (pos.startX >= maxX) {
    //   console.log('1');
    //   const targetStartX = Math.min(pos.startX, maxX);
    //   const targetStartY = Math.min(pos.startY, maxY);
    //   const targetEndX = pos.endX - pos.startX;
    //   const targetEndY = pos.endY - pos.startY;
    //   context.fillRect(
    //     targetStartX,
    //     targetStartY,
    //     Math.max(targetEndX, size.width * -1),
    //     Math.max(targetEndY, size.height * -1)
    //   );
    // } else if (pos.startY >= maxY) {
    //   console.log('2');

    //   const targetStartX = Math.min(pos.startX, maxX);
    //   const targetStartY = Math.min(pos.startY, maxY);
    //   const targetEndX = pos.endX - pos.startX;
    //   const targetEndY = pos.endY - pos.startY;
    //   context.fillRect(
    //     targetStartX,
    //     targetStartY,
    //     Math.max(targetEndX, size.width * -1),
    //     Math.max(targetEndY, size.height * -1)
    //   );
    // } else if (pos.startX <= minX) {
    //   console.log('3');

    //   const targetStartX = Math.max(pos.startX, minX);
    //   const targetStartY = Math.max(pos.startY, minY);
    //   const targetEndX = pos.endX - pos.startX;
    //   const targetEndY = pos.endY - pos.startY;
    //   context.fillRect(
    //     targetStartX,
    //     targetStartY,
    //     Math.min(targetEndX, size.width),
    //     Math.min(targetEndY, size.height - targetStartY + PADDING)
    //   );
    // } else if (pos.startY <= minY) {
    //   console.log('4');

    //   const targetStartX = Math.max(pos.startX, minX);
    //   const targetStartY = Math.max(pos.startY, minY);
    //   const targetEndX = pos.endX - pos.startX;
    //   const targetEndY = pos.endY - pos.startY;
    //   context.fillRect(
    //     targetStartX,
    //     targetStartY,
    //     Math.min(targetEndX, size.width - targetStartX + PADDING),
    //     Math.min(targetEndY, size.height)
    //   );
    // } else {
    //   console.log('5');
    //   const targetStartX = Math.max(pos.startX, minX);
    //   const targetStartY = Math.max(pos.startY, minY);
    //   const targetEndX = pos.endX - pos.startX;
    //   const targetEndY = pos.endY - pos.startY;

    //   console.log(targetStartX, targetStartY, targetEndX, targetEndY);
    //   // if (targetEndX < 0 || targetStartX < 0) {
    //   //   context.fillRect(
    //   //     Math.max(pos.startX, minX),
    //   //     Math.max(pos.startY, minY),
    //   //     Math.max(targetEndX, targetStartX * -1 + PADDING),
    //   //     Math.max(targetEndY, targetStartY * -1 + PADDING)
    //   //   );
    //   // } else if (targetEndY < 0 || targetStartY < 0) {
    //   //   context.fillRect(
    //   //     Math.max(pos.startX, minX),
    //   //     Math.max(pos.startY, minY),
    //   //     Math.min(targetEndX, size.width - pos.startX + PADDING),
    //   //     Math.max(targetEndY, targetStartY * -1 + PADDING)
    //   //   );
    //   // } else {
    //   //   context.fillRect(
    //   //     Math.max(pos.startX, minX),
    //   //     Math.max(pos.startY, minY),
    //   //     Math.min(targetEndX, size.width - pos.startX + PADDING),
    //   //     Math.min(targetEndY, size.height - pos.startY + PADDING)
    //   //   );
    //   // }
    // }
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
