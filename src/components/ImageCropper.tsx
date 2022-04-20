import React from 'react';
import styled from 'styled-components';

const CanvasWrapper = styled.div<{ width?: number; height?: number }>`
  position: relative;
  ${({ width, height }) => {
    return `width: ${width}px; height: ${height}px;`;
  }};
  background-color: rgba(255, 0, 0, 0.1);
`;
const Canvas = styled.canvas`
  left: 0;
  position: absolute;
  border: 1px solid red;
  cursor: crosshair;
  background: rgba(0, 0, 0, 0.5);
  // background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
`;

interface Props {
  width?: number;
  height?: number;
  padding: number;
  imageUrl: string;
}

const ImageCropper: React.FC<Props> = ({
  width,
  height,
  padding,
  imageUrl,
}) => {
  const shadowRef = React.useRef<HTMLCanvasElement>(null);
  const imageRef = React.useRef(new Image());
  const [imageSize, setImageSize] = React.useState({ width: 0, height: 0 });
  const [isImageLoaded, setIsImagedLoaded] = React.useState(false);

  const [canvasWidth, canvasHeight] = React.useMemo(() => {
    return [imageSize.width + padding * 2, imageSize.height + padding * 2];
  }, [imageSize, padding]);

  React.useEffect(() => {
    // load Image...
    const imageEl = imageRef.current;
    imageEl.src = imageUrl;
    imageEl.onload = () => {
      setImageSize({
        width: imageEl.width,
        height: imageEl.height,
      });
      setIsImagedLoaded(true);
    };
  }, [imageUrl]);

  React.useEffect(() => {
    console.log(isImageLoaded);
    if (!isImageLoaded) return;
    const context = shadowRef.current!.getContext('2d');
    console.log(context, imageRef.current, imageSize);
    context?.drawImage(imageRef.current, padding, padding);
  }, [isImageLoaded, padding]);

  return (
    <CanvasWrapper width={canvasWidth} height={canvasHeight}>
      <Canvas ref={shadowRef} width={canvasWidth} height={canvasHeight} />
    </CanvasWrapper>
  );
};

export default ImageCropper;
