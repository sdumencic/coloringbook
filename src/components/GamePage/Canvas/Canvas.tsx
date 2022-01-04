import "./Canvas.scss";

import {
  CANVAS_BASE_WIDTH,
  CANVAS_BRUSH_CAP,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  IMAGE_MASK_URL,
  IMAGE_OUTLINE_URL,
} from "./Constants";
import {
  CSSProperties,
  MouseEvent,
  TouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { clearCanvas, getMousePos, setBrush } from "./Helpers";

import { GlobalState } from "../../../redux/store";
import { useSelector } from "react-redux";

const Canvas = () => {
  // Slices from the global state
  const client = useSelector((state: GlobalState) => state.client);
  const brush = useSelector((state: GlobalState) => state.brush);
  const clear_Canvas = useSelector((state: GlobalState) => state.actions.clearCanvas);

  const [isDrawing, setIsDrawing] = useState(false);

  /**
   * Canvas used to draw background image or color to it.
   */
  const BGCanvasRef = useRef<HTMLCanvasElement | null>(null);
  /**
   * Canvas used to display the animal and the manipulated drawing data.
   */
  const CanvasRef = useRef<HTMLCanvasElement | null>(null);
  /**
   * Canvas used to manipulate drawing data and convert it to image.
   */
  const HiddenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  /**
   * Canvas used to intercept mouse.
   */
  const DrawCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // References to images
  const [imageOutline, setImageOutline] = useState<HTMLImageElement | null>(null);
  const [imageMask, setImageMask] = useState<HTMLImageElement | null>(null);

  /**
   * This useEffect runs only on mount and unmount.
   * We only use this to load our initial image data.
   * Linter cant detect this use case which is why we have disable next-line at the end.
   */
  useEffect(() => {
    const image_outline = new Image();
    image_outline.src = IMAGE_OUTLINE_URL;
    image_outline.onload = () => {
      setImageOutline(image_outline);
    };

    const image_mask = new Image();
    image_mask.src = IMAGE_MASK_URL;
    image_mask.onload = () => {
      setImageMask(image_mask);
    };

    // eslint-disable-next-line
  }, []);

  /**
   * Starts the render Loop after the images have been loaded
   */
  useEffect(() => {
    if (imageOutline && imageMask) {
      window.requestAnimationFrame(renderFrame);
    }
    // eslint-disable-next-line
  }, [imageOutline, imageMask]);

  /**
   *
   */
  useEffect(() => {
    console.log("Clearing canvas!");
    clearCanvas(HiddenCanvasRef);
  }, [clear_Canvas]);

  const renderFrame = () => {
    let Canvas: HTMLCanvasElement;
    let Context: CanvasRenderingContext2D | null;

    // Draw Background
    if (BGCanvasRef.current) {
      // Set references
      Canvas = BGCanvasRef.current;
      Context = Canvas.getContext("2d");

      // TODO: Customizable color
      if (Context) {
        Context.fillStyle = "green";
        Context.fillRect(0, 0, Canvas.width, Canvas.height);
      }
    }

    // Draw Image
    if (CanvasRef.current) {
      Canvas = CanvasRef.current;
      Context = Canvas.getContext("2d");

      if (Context && imageMask && imageOutline) {
        // Clear the canvas and draw the mask
        Context.globalCompositeOperation = "source-over";
        Context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        Context.drawImage(imageMask, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Fill in the drawing data
        if (HiddenCanvasRef.current) {
          Context.globalCompositeOperation = "source-in";
          Context.drawImage(HiddenCanvasRef.current, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }

        // Draw outline and fill non painted parts with a mask
        Context.globalCompositeOperation = "source-over";
        Context.drawImage(imageOutline, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        Context.globalCompositeOperation = "destination-over";
        Context.drawImage(imageMask, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }
    }

    window.requestAnimationFrame(renderFrame);
  };

  /**
   * Scales and positions the Rendering canvas
   */
  const getCanvasStyle = (): CSSProperties => {
    const properties: CSSProperties = {};

    if (CanvasRef.current && DrawCanvasRef.current) {
      if (client.height > client.width) {
        properties.width = "100%";
        properties.height = `${client.width}px`;
        properties.top = `${(client.height - client.width) / 2}px`;
      } else {
        properties.height = "100%";
        properties.width = `${client.height}px`;
        properties.left = `${(client.width - client.height) / 2}px`;
      }
    }

    return properties;
  };

  const touchStart = (event: TouchEvent) => {
    startDrawing(
      event.nativeEvent.touches[0].clientX,
      event.nativeEvent.touches[0].clientY
    );
  };

  const mouseDown = (event: MouseEvent) => {
    startDrawing(event.nativeEvent.clientX, event.nativeEvent.clientY);
  };

  const startDrawing = (clientX: number, clientY: number) => {
    if (DrawCanvasRef.current) {
      const Canvas = DrawCanvasRef.current;
      const Context = Canvas.getContext("2d");

      if (Context) {
        // Get current mouse positions
        const { x, y } = getMousePos(DrawCanvasRef, clientX, clientY);

        // If mouse position is allright, then begin line path
        if (x && y) {
          Context.beginPath();
          Context.moveTo(x, y);
          setIsDrawing(true);
        }
      }
    }
  };

  const touchMove = (event: TouchEvent) => {
    drawMove(
      event.nativeEvent.touches[0].clientX,
      event.nativeEvent.touches[0].clientY
    );
  };

  const mouseMove = (event: MouseEvent) => {
    drawMove(event.nativeEvent.clientX, event.nativeEvent.clientY);
  };

  const drawMove = (clientX: number, clientY: number) => {
    if (!isDrawing) {
      return;
    }

    if (DrawCanvasRef.current) {
      const Canvas = DrawCanvasRef.current;
      const Context = Canvas.getContext("2d");

      if (Context) {
        const { x, y } = getMousePos(DrawCanvasRef, clientX, clientY);

        if (x && y) {
          Context.lineTo(x, y);
          Context.stroke();
        }
      }
    }
  };

  const finishDrawing = () => {
    if (DrawCanvasRef.current && HiddenCanvasRef.current) {
      const Canvas = DrawCanvasRef.current;
      const HiddenCanvas = HiddenCanvasRef.current;
      const Context = Canvas.getContext("2d");
      const HiddenContext = HiddenCanvas.getContext("2d");

      if (Context && HiddenContext) {
        // Stop drawing the path
        Context.closePath();
        setIsDrawing(false);

        HiddenContext.drawImage(Canvas, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        clearCanvas(DrawCanvasRef);
      }
    }
  };

  // Set Drawable Canvas Width and Height if images are loaded
  const style = imageMask && imageOutline ? getCanvasStyle() : {};
  // Brush settings
  setBrush(
    DrawCanvasRef,
    brush.color,
    (brush.width + 1) * CANVAS_BASE_WIDTH,
    CANVAS_BRUSH_CAP
  );

  return (
    <div className="viewport">
      <canvas
        className="background"
        height={client.height}
        width={client.width}
        ref={BGCanvasRef}
      ></canvas>
      <canvas
        style={style}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        ref={CanvasRef}
      ></canvas>
      <canvas
        className="hidden"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        ref={HiddenCanvasRef}
      ></canvas>
      <canvas
        style={style}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onMouseDown={mouseDown}
        onTouchStart={touchStart}
        onMouseMove={mouseMove}
        onTouchMove={touchMove}
        onMouseUp={finishDrawing}
        onTouchEnd={finishDrawing}
        ref={DrawCanvasRef}
      ></canvas>
    </div>
  );
};

export default Canvas;
