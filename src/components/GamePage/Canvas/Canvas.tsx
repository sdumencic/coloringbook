import "./Canvas.scss";

import { CANVAS_BASE_WIDTH, CANVAS_BRUSH_CAP, CANVAS_HEIGHT, CANVAS_WIDTH } from "./Constants";
import { CSSProperties, MouseEvent, TouchEvent, useEffect, useRef, useState } from "react";
import {
	MousePosition,
	angleBetweenPoints,
	clearCanvas,
	distanceBetweenPoints,
	getMousePos,
	setBrush,
} from "./Helpers";

import { GlobalState } from "../../../redux/store";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";

interface CanvasProps {
	outline_url: string;
	mask_url: string;
}

const Canvas = (props: CanvasProps) => {
	// SECTION: Slices from the global state
	const settings = useSelector((state: GlobalState) => state.settings);
	const client = useSelector((state: GlobalState) => state.client);
	const brush = useSelector((state: GlobalState) => state.brush);
	const clear_Canvas = useSelector((state: GlobalState) => state.actions.clearCanvas);

	// SECTION: Internal state
	const [isDrawing, setIsDrawing] = useState(false);
	const [lastPoint, setLastPoint] = useState<MousePosition | null>(null);
	const [imageOutline, setImageOutline] = useState<HTMLImageElement | null>(null);
	const [imageMask, setImageMask] = useState<HTMLImageElement | null>(null);

	// SECTION: Internal references
	// BG - Background, Data - What we draw, FG - The outline
	const BGCanvasRef = useRef<HTMLCanvasElement | null>(null);
	const DataCanvasRef = useRef<HTMLCanvasElement | null>(null);
	const FGCanvasRef = useRef<HTMLCanvasElement | null>(null);

	// SECTION: UseEffects
	// We only use this to load our initial image data
	useEffect(() => {
		if (!imageOutline) {
			const image_outline = new Image();
			image_outline.src = props.outline_url;
			image_outline.onload = () => setImageOutline(image_outline);
		}

		if (!imageMask) {
			const image_mask = new Image();
			image_mask.src = props.mask_url;
			image_mask.onload = () => setImageMask(image_mask);
		}

		// eslint-disable-next-line
	}, []);

	// Starts the render Loop after the images have been loaded
	useEffect(() => {
		if (imageOutline && imageMask) window.requestAnimationFrame(renderLoop);
	}, [imageOutline, imageMask]);

	// Used for clearing canvas
	useEffect(() => {
		clearCanvas(DataCanvasRef);
	}, [clear_Canvas]);

	const mainCanvasStyle: CSSProperties = {
		width: client.height > client.width ? "100%" : `${client.height}px`,
		height: client.height > client.width ? `${client.width}px` : "100%",
		top: client.height > client.width ? `${(client.height - client.width) / 2}px` : 0,
		left: client.height > client.width ? 0 : `${(client.width - client.height) / 2}px`,
	};

	const renderLoop = () => {
		// Set up the variables
		const BGCanvas = BGCanvasRef.current;
		const BGContext = BGCanvasRef.current?.getContext("2d");
		const FGCanvas = FGCanvasRef.current;
		const FGContext = FGCanvas?.getContext("2d");
		const DataCanvas = DataCanvasRef.current;

		if (BGCanvas && BGContext && FGCanvas && FGContext && DataCanvas && imageOutline && imageMask) {
			// Draw Background
			BGContext.fillStyle = "rgb(220,255,244)";
			BGContext?.fillRect(0, 0, BGCanvas.width, BGCanvas.height);

			// Clear the canvas and draw the mask
			FGContext.globalCompositeOperation = "source-over";
			FGContext?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			FGContext?.drawImage(imageMask, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

			// Fill in the drawing data
			FGContext.globalCompositeOperation = "source-in";
			FGContext?.drawImage(DataCanvas, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

			// Draw outline and fill non painted parts with a mask
			FGContext.globalCompositeOperation = "source-over";
			FGContext?.drawImage(imageOutline, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			FGContext.globalCompositeOperation = "destination-over";
			FGContext?.drawImage(imageMask, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		}

		window.requestAnimationFrame(renderLoop);
	};

	const startStopToggleMode = ({ nativeEvent: { clientX, clientY } }: MouseEvent) => {
		if (settings.draw_mode === "toggle") {
			if (isDrawing) {
				setIsDrawing(false);
				setLastPoint(null);
			} else {
				setIsDrawing(true);
				const { x, y } = getMousePos(FGCanvasRef, clientX, clientY);
				drawCircle(x, y, false);
			}
		}
	};

	const mouseDown = ({ nativeEvent: { clientX, clientY } }: MouseEvent) => {
		startHoldMode(clientX, clientY);
	};

	const touchStart = ({ nativeEvent: { touches } }: TouchEvent) => {
		startHoldMode(touches[0].clientX, touches[0].clientY);
	};

	const startHoldMode = (clientX: number, clientY: number) => {
		if (settings.draw_mode === "hold") {
			setIsDrawing(true);
			const { x, y } = getMousePos(FGCanvasRef, clientX, clientY);
			drawCircle(x, y, false);
		}
	};

	const stopHoldMode = () => {
		if (settings.draw_mode === "hold" && isDrawing) {
			setLastPoint(null);
			setIsDrawing(false);
		}
	};

	const touchMove = (event: TouchEvent) => {
		drawMove(event.nativeEvent.touches[0].clientX, event.nativeEvent.touches[0].clientY);
	};

	const mouseMove = ({ nativeEvent: { clientX, clientY } }: MouseEvent) => {
		drawMove(clientX, clientY);
	};

	const drawMove = (clientX: number, clientY: number) => {
		if (!isDrawing) return;

		const currentPoint = getMousePos(FGCanvasRef, clientX, clientY);

		if (lastPoint !== null) {
			const dist = distanceBetweenPoints(lastPoint, currentPoint);
			const angle = angleBetweenPoints(lastPoint, currentPoint);

			for (let i = 0; i < dist; i += 5) {
				const x = lastPoint.x + Math.sin(angle) * i - 25;
				const y = lastPoint.y + Math.cos(angle) * i - 25;
				drawCircle(x, y);
			}
		}

		setLastPoint(currentPoint);
	};

	const drawCircle = (x: number, y: number, correctBrush = true) => {
		const Context = DataCanvasRef.current?.getContext("2d");
		const brushOffset = correctBrush ? ((brush.width + 1) * CANVAS_BASE_WIDTH) / 2 : 0;
		Context?.beginPath();
		Context?.arc(x + brushOffset, y + brushOffset, 0, 0, Math.PI * 2, false);
		Context?.closePath();
		Context?.fill();
		Context?.stroke();
	};

	const renderSpinner = () => {
		if (imageMask !== null && imageOutline !== null) return null;

		return <LoadingSpinner bgColor={"rgb(220, 255, 254)"} textColor="#4357a5" spinnerColor="#3085d6" />;
	};

	// Brush settings
	setBrush(DataCanvasRef, brush.color, (brush.width + 1) * CANVAS_BASE_WIDTH, CANVAS_BRUSH_CAP);

	return (
		<>
			{renderSpinner()}
			<div className="viewport">
				<canvas
					className="background"
					height={client.height}
					width={client.width}
					ref={BGCanvasRef}
					onMouseMove={stopHoldMode}
				></canvas>
				<canvas className="hidden" width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={DataCanvasRef}></canvas>
				<canvas
					style={mainCanvasStyle}
					width={CANVAS_WIDTH}
					height={CANVAS_HEIGHT}
					onClick={startStopToggleMode}
					onMouseDown={mouseDown}
					onTouchStart={touchStart}
					onMouseMove={mouseMove}
					onTouchMove={touchMove}
					onMouseUp={stopHoldMode}
					onTouchEnd={stopHoldMode}
					ref={FGCanvasRef}
				></canvas>
			</div>
		</>
	);
};

export default Canvas;
