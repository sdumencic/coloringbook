import "./Canvas.module.css";

import { MouseEvent, useEffect, useRef, useState } from "react";

const IMAGE_OUTLINE = "/images/parrot_outline.png";
const IMAGE_MASK = "/images/parrot_mask.png";

const CANVAS_BRUSH_COLOR = "red";
const CANVAS_BRUSH_WIDTH = 40;
const CANVAS_BRUSH_CAP = "round";

const Canvas = () => {
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const image_outline = new Image();
  const image_mask = new Image();

  useEffect(() => {
    // Initialize the Canvas
    if (canvasRef.current) {
      contextRef.current = canvasRef.current.getContext("2d");

      // Set Canvas Width
      setWidth();

      image_outline.src = IMAGE_OUTLINE;
      image_mask.src = IMAGE_MASK;

      // Brush settings
      setBrush(CANVAS_BRUSH_COLOR, CANVAS_BRUSH_WIDTH, CANVAS_BRUSH_CAP);

      //window.requestAnimationFrame(gameLoop);
    }
  }, []);

  const setWidth = () => {
    if (canvasRef.current) {
      canvasRef.current.width = 1920;
      canvasRef.current.height = 1080;
      canvasRef.current.style.width = "100%";
      canvasRef.current.style.height = "100%";
    }
  };

  /**
   * Set canvas brush to the specified width, color and cap.
   * @param width Width of the canvas brush.
   * @param color Color of the canvas brush.
   * @param cap Cap of the canvas brush.
   */
  const setBrush = (
    color?: string | CanvasGradient | CanvasPattern,
    width?: number,
    cap?: CanvasLineCap
  ) => {
    if (contextRef.current) {
      if (color) contextRef.current.strokeStyle = color;
      if (width) contextRef.current.lineWidth = width;
      if (cap) contextRef.current.lineCap = cap;
    }
  };

  const startDrawing = ({ nativeEvent }: MouseEvent) => {
    const { offsetX, offsetY } = nativeEvent;

    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    // TODO: Clear drawing data :)

    contextRef.current?.clearRect(
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height
    );
  };

  const drawMove = ({ nativeEvent }: MouseEvent) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
  };

  const draw = () => {
    // Fetch the references to both canvas and its context
    const canvas = canvasRef.current;
    const context = contextRef.current;

    if (canvas && context) {
      // Clear the canvas and draw the mask
      context.globalCompositeOperation = "source-over";
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image_mask, 0, 0, 1920, 1080);

      // Fill in the drawing data
      // TODO: Customizable drawing data etc :)
      context.globalCompositeOperation = "source-in";
      context.fillStyle = "red";
      context.fillRect(600, 300, 800, 600);

      // Draw outline and fill non painted parts with a mask
      context.globalCompositeOperation = "source-over";
      context.drawImage(image_outline, 0, 0, 1920, 1080);
      context.globalCompositeOperation = "destination-over";
      context.drawImage(image_mask, 0, 0, 1920, 1080);

      // Draw background
      // TODO: Customizable color
      context.fillStyle = "blue";
      context.fillRect(0, 0, 1920, 1080);
    } else {
      console.warn("Frame drop - Canvas references not found.");
    }
  };

  /**
   * The game looop that redraws the canvas everytime refresh is available.
   */
  const gameLoop = () => {
    // TODO: Seconds passed
    // Not even sure if we need a game loop but i will leave it for now

    draw();

    window.requestAnimationFrame(gameLoop);
  };

  return (
    <>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={drawMove}
        ref={canvasRef}
      ></canvas>
      <button onClick={clearCanvas}>Brisi</button>
    </>
  );
};

export default Canvas;
