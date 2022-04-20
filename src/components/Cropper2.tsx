import React from 'react';
import styled from 'styled-components';
import useCanvas from '../hooks/useCanvas';
import useImage from '../hooks/useImage';
import { getRectagle, isInRect, Rectangle } from '../utils/crop';

const Canvas = styled.canvas`
  background: red;
`;
interface Props {
  imgUrl: string;
}
const Cropper2: React.FC<Props> = ({ imgUrl }) => {
  // const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const imgRef = React.useRef<HTMLImageElement | null>(null);
  // const [rect, setRect] = React.useState({ x: 0, y: 0, w: 0, h: 0 });
  const { canvasRef } = useCanvas();
  let rect: Rectangle = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  let pos = {
    isActive: false,
    isLeave: false,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    clientX: 0,
    clientY: 0,
  };
  console.log(rect);
  React.useEffect(() => {
    const mouseUp = (e: any) => {
      if (!pos.isActive) return;
      pos.isActive = false;
      rect = getRectagle(
        canvasRef.current,
        pos.startX,
        pos.startY,
        pos.endX + e.clientX - pos.clientX,
        pos.endY + e.clientY - pos.clientY
      );
    };
    const mouseMove = (e: any) => {
      if (!pos.isActive) return;
      if (!pos.isLeave) return;
      const { x, y, width, height } = getRectagle(
        canvasRef.current,
        pos.startX,
        pos.startY,
        pos.endX + e.clientX - pos.clientX,
        pos.endY + e.clientY - pos.clientY
      );
      const context = canvasRef.current.getContext('2d');
      context?.clearRect(0, 0, 400, 400);
      context!.fillStyle = 'blue';
      context?.fillRect(x, y, width, height);
    };
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
    return () => {
      document.removeEventListener('mouseup', mouseUp);
      document.removeEventListener('mousemove', mouseMove);
    };
  }, []);
  const handleMouseDown = (e: React.MouseEvent) => {
    //
    console.log('MouseDown..');
    console.log(isInRect(rect, e.nativeEvent.offsetX, e.nativeEvent.offsetY));
    if (isInRect(rect, e.nativeEvent.offsetX, e.nativeEvent.offsetY)) {
      return;
    }
    pos.isActive = true;
    pos.startX = e.nativeEvent.offsetX;
    pos.startY = e.nativeEvent.offsetY;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    //
    console.log('MouseUp...');
    pos.isActive = false;
    // pos.endX = e.nativeEvent.offsetX;
    // pos.endY = e.nativeEvent.offsetY;
    rect = getRectagle(
      canvasRef.current,
      pos.startX,
      pos.startY,
      pos.endX,
      pos.endY
    );
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    //
    if (!pos.isActive) return;
    pos.isLeave = false;
    pos.endX = e.nativeEvent.offsetX;
    pos.endY = e.nativeEvent.offsetY;

    const { x, y, width, height } = getRectagle(
      canvasRef.current,
      pos.startX,
      pos.startY,
      pos.endX,
      pos.endY
    );
    const context = canvasRef.current.getContext('2d');
    context?.clearRect(0, 0, 400, 400);
    context!.fillStyle = 'blue';
    context?.fillRect(x, y, width, height);

    // if (!context) return;
    // context.beginPath();
    // context.arc(
    //   (pos.endX + pos.startX) / 2,
    //   (pos.endY + pos.startY) / 2,
    //   Math.abs(w),
    //   0,
    //   2 * Math.PI,
    //   false
    // );
    // context.fillStyle = 'green';
    // context.fill();
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    //
    pos.isLeave = true;
    if (!pos.isActive) return;
    pos.endX = e.nativeEvent.offsetX;
    pos.endY = e.nativeEvent.offsetY;
    pos.clientX = e.clientX;
    pos.clientY = e.clientY;
    const { x, y, width, height } = getRectagle(
      canvasRef.current,
      pos.startX,
      pos.startY,
      pos.endX,
      pos.endY
    );
    const context = canvasRef.current.getContext('2d');
    if (!context) return;
    context?.clearRect(0, 0, 400, 400);
    context!.fillStyle = 'blue';
    context?.fillRect(x, y, width, height);
  };

  return (
    <div>
      <img ref={imgRef} />
      {/* {img} */}
      <Canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        width={400}
        height={400}
      />
    </div>
  );
};

export default Cropper2;
