import "./Canvas.scss";

import { CSSProperties, MouseEvent, useEffect, useRef, useState } from "react";

import { GlobalState } from "../../../redux/store";
import { useSelector } from "react-redux";

const IMAGE_OUTLINE = "/images/parrot_outline.png";
const IMAGE_MASK = "/images/parrot_mask.png";

const CANVAS_BRUSH_COLOR = "red";
const CANVAS_BRUSH_WIDTH = 40;
const CANVAS_BRUSH_CAP = "round";

const CANVAS_WIDTH = 2000;
const CANVAS_HEIGHT = 2000;

interface MousePosition {
  x?: number;
  y?: number;
}

const Canvas = () => {
  const client = useSelector((state: GlobalState) => state.client);

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
  const [imageData, setImageData] = useState<HTMLImageElement | null>(null);

  /**
   * This useEffect runs only on mount and unmount.
   * We only use this to load our initial image data.
   * Linter cant detect this use case which is why we have disable next-line at the end.
   */
  useEffect(() => {
    const image_outline = new Image();
    image_outline.src = IMAGE_OUTLINE;
    image_outline.onload = () => {
      setImageOutline(image_outline);
    };

    const image_mask = new Image();
    image_mask.src = IMAGE_MASK;
    image_mask.onload = () => {
      setImageMask(image_mask);
    };

    // eslint-disable-next-line
  }, []);

  /**
   * This useEffect runs on every rendering iteration.
   * We use this to render the refreshed data onto a canvas. :)
   */
  useEffect(() => {
    console.log(imageData);
    renderFrame();
  });

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

  const renderFrame = () => {
    let Canvas: HTMLCanvasElement;
    let Context: CanvasRenderingContext2D | null;

    // Draw Hidden canvas
    if (HiddenCanvasRef.current) {
      // Set references
      Canvas = HiddenCanvasRef.current;
      Context = Canvas.getContext("2d");

      if (Context) {
        if (imageData) {
          Context.drawImage(imageData, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }
      }
    }

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
        // TODO: Customizable drawing data etc :)
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
    if (DrawCanvasRef.current) {
      const Canvas = DrawCanvasRef.current;
      const Context = Canvas.getContext("2d");

      if (Context) {
        if (color) Context.strokeStyle = color;
        if (width) Context.lineWidth = width;
        if (cap) Context.lineCap = cap;
      }
    }
  };

  /**
   * Returns mouse position correctly scaled from the DOM coordinates to the internal canvas ones
   * @param param0 HTML Mouse Event
   * @returns MousePosition (x, y) interface with correctly scaled position
   */
  const getMousePos = ({ nativeEvent }: MouseEvent): MousePosition => {
    const canvas = DrawCanvasRef.current;

    if (canvas) {
      const rect = canvas.getBoundingClientRect(); // Abs. size of element
      const scaleX = canvas.width / rect.width; // Relationship bitmap vs. element for X
      const scaleY = canvas.height / rect.height; // Relationship bitmap vs. element for Y

      return {
        x: (nativeEvent.clientX - rect!.left) * scaleX, // Scale mouse coordinates after they have
        y: (nativeEvent.clientY - rect!.top) * scaleY, // been adjusted to be relative to element
      };
    }

    return {};
  };

  const clearCanvas = (
    CanvasToClearRef: React.MutableRefObject<HTMLCanvasElement | null>
  ) => {
    if (CanvasToClearRef.current) {
      const Canvas = CanvasToClearRef.current;
      const Context = Canvas.getContext("2d");

      if (Context) {
        Context.clearRect(0, 0, Canvas.width, Canvas.height);
      }
    }
  };

  const startDrawing = (event: MouseEvent) => {
    if (DrawCanvasRef.current) {
      const Canvas = DrawCanvasRef.current;
      const Context = Canvas.getContext("2d");

      if (Context) {
        // Get current mouse positions
        const { x, y } = getMousePos(event);

        // If mouse position is allright, then begin line path
        if (x && y) {
          Context.beginPath();
          Context.moveTo(x, y);
          setIsDrawing(true);
        }
      }
    }
  };

  const finishDrawing = () => {
    if (DrawCanvasRef.current) {
      const Canvas = DrawCanvasRef.current;
      const Context = Canvas.getContext("2d");

      if (Context) {
        // Stop drawing the path
        Context.closePath();
        setIsDrawing(false);

        const tmpImg = new Image();
        tmpImg.src = Canvas.toDataURL("image/png");
        tmpImg.onload = () => {
          setImageData(tmpImg);
        };

        //setImageData(Context.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT));

        clearCanvas(DrawCanvasRef);
      }
    }
  };

  const drawMove = (event: MouseEvent) => {
    if (!isDrawing) {
      return;
    }

    if (DrawCanvasRef.current) {
      const Canvas = DrawCanvasRef.current;
      const Context = Canvas.getContext("2d");

      if (Context) {
        const { x, y } = getMousePos(event);

        if (x && y) {
          Context.lineTo(x, y);
          Context.stroke();
        }
      }
    }
  };

  // Set Drawable Canvas Width and Height if images are loaded
  const style = imageMask && imageOutline ? getCanvasStyle() : {};
  // Brush settings
  setBrush(CANVAS_BRUSH_COLOR, CANVAS_BRUSH_WIDTH, CANVAS_BRUSH_CAP);

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
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={drawMove}
        ref={DrawCanvasRef}
      ></canvas>
      <button
        onClick={() => {
          clearCanvas(HiddenCanvasRef);
          setImageData(null);
        }}
      >
        Brisi
      </button>
    </div>
  );
};

export default Canvas;
