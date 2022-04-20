import React from 'react';

function useCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement>(
    document.createElement('canvas')
  );

  React.useEffect(() => {
    const canvas = canvasRef.current;
    // canvas.width = 512;
    // canvas.height = 512;
  }, []);

  return {
    canvasRef,
  };
}

export default useCanvas;
