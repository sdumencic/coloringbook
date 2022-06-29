import "./Canvas.scss";

import { CANVAS_BASE_WIDTH, CANVAS_BRUSH_CAP, CANVAS_HEIGHT, CANVAS_WIDTH } from "./Constants";
import { CSSProperties, MouseEvent, TouchEvent, useEffect, useRef, useState } from "react";
import {
	MousePosition,
	angleBetweenPoints,
	clearCanvas,
	compareReal,
	createCanvas,
	distanceBetweenPoints,
	downloadCanvas,
	getMousePos,
	getRealPixelCount,
	loadImageToState,
	loadRawImageArrayToState,
	setBrush,
} from "./Helpers";
import { useDispatch, useSelector } from "react-redux";

import { GameTypes } from "../../../redux/reducers/GameReducer";
import { GlobalState } from "../../../redux/store";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

interface CanvasProps {
	outlineImageURL: string;
	maskImageURL: string;
	bigImageURL: string;
	name: string;
}

const Canvas = (props: CanvasProps) => {
	const dispatch = useDispatch(); // For updating the score :)

	// SECTION: Slices from the global state
	const settings = useSelector((state: GlobalState) => state.settings);
	const client = useSelector((state: GlobalState) => state.client);
	const brush = useSelector((state: GlobalState) => state.brush);
	const actions = useSelector((state: GlobalState) => state.actions);

	// SECTION: Internal state
	const [isDrawing, setIsDrawing] = useState(false);
	const [lastPoint, setLastPoint] = useState<MousePosition | null>(null);

	// SECTION: Loaded images
	const [imageOutline, setImageOutline] = useState<HTMLImageElement | null>(null);
	const [imageMask, setImageMask] = useState<HTMLImageElement | null>(null);
	const [imageBigArray, setImageBigArray] = useState<Uint8ClampedArray | null>(null);
	const [imageBigPixelCount, setImageBigPixelCount] = useState(0);

	const allImagesLoaded = () => {
		return imageOutline && imageMask && imageBigArray;
	};

	useEffect(() => {
		// Start the render Loop after the images have been loaded
		if (allImagesLoaded()) {
			window.requestAnimationFrame(renderLoop);
			setImageBigPixelCount(getRealPixelCount(imageBigArray!));
		}
	}, [imageOutline, imageMask, imageBigArray]);

	// SECTION: Canvas references
	const BGCanvasRef = useRef<HTMLCanvasElement | null>(null); // Background
	const DataCanvasRef = useRef<HTMLCanvasElement | null>(null); // Our drawn data
	const FGCanvasRef = useRef<HTMLCanvasElement | null>(null); // Outline

	// SECTION: Canvas Actions
	useEffect(() => {
		clearCanvas(DataCanvasRef);
		dispatch({
			type: GameTypes.Score,
			payload: 0,
		});
	}, [actions.clearCanvas]);
	useEffect(() => {
		if (allImagesLoaded()) downloadCanvas(FGCanvasRef, props.name);
	}, [actions.saveImage]);

	// NOTE: Initial Load
	useEffect(() => {
		loadImageToState(props.outlineImageURL, imageOutline, setImageOutline);
		loadImageToState(props.maskImageURL, imageMask, setImageMask);
		loadRawImageArrayToState(props.bigImageURL, CANVAS_WIDTH, CANVAS_HEIGHT, setImageBigArray);
		createCanvas(DataCanvasRef, CANVAS_WIDTH, CANVAS_HEIGHT);
		// eslint-disable-next-line
	}, []);

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

	const compareImages = () => {
		const FGImageData = FGCanvasRef.current?.getContext("2d")?.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		if (FGImageData && imageBigArray) {
			dispatch({
				type: GameTypes.Score,
				payload: compareReal(imageBigArray, FGImageData.data, imageBigPixelCount),
			});
		}
	};

	const startStopToggleMode = ({ nativeEvent: { clientX, clientY } }: MouseEvent) => {
		if (settings.draw_mode === "toggle") {
			if (isDrawing) {
				setIsDrawing(false);
				setLastPoint(null);
				compareImages();
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
			compareImages();
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
		if (allImagesLoaded()) return null;
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
