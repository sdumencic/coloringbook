import "./Canvas.module.css";

import { MouseEvent, useEffect, useRef, useState } from "react";

const IMAGE = "/images/parrot.png";

const Canvas = () => {
	const [isDrawing, setIsDrawing] = useState(false);

	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);

	useEffect(() => {
		// Initialize the Canvas
		if (canvasRef.current) {
			canvasContextRef.current = canvasRef.current.getContext("2d");

			//poveca density pixela
			canvasRef.current.width = window.innerWidth * 2;
			canvasRef.current.height = window.innerHeight * 2;
			canvasRef.current.style.width = `${window.innerWidth}px`;
			canvasRef.current.style.height = `${window.innerHeight}px`;

			const image = new Image();
			image.src = IMAGE;

			//postavke kista
			if (canvasContextRef.current) {
				image.onload = () => {
					canvasContextRef.current?.drawImage(image, 0, 0);
				};
				canvasContextRef.current.scale(2, 2);
				canvasContextRef.current.lineCap = "round";
				canvasContextRef.current.strokeStyle = "pink";
				canvasContextRef.current.lineWidth = 40;
			}
		}
	}, []);

	const startDrawing = ({ nativeEvent }: MouseEvent) => {
		const { offsetX, offsetY } = nativeEvent;

		canvasContextRef.current?.beginPath();
		canvasContextRef.current?.moveTo(offsetX, offsetY);
		setIsDrawing(true);
	};

	const finishDrawing = () => {
		canvasContextRef.current?.closePath();
		setIsDrawing(false);
	};

	const draw = ({ nativeEvent }: MouseEvent) => {
		if (!isDrawing) {
			return;
		}
		const { offsetX, offsetY } = nativeEvent;
		canvasContextRef.current?.lineTo(offsetX, offsetY);
		canvasContextRef.current?.stroke();
	};

	const clearCanvas = () => {
		const canvas = canvasRef.current;
		const context = canvas?.getContext("2d");

		context!.fillStyle = "white";
		context?.fillRect(0, 0, canvas!.width, canvas!.height);

		const image = new Image();
		image.src = IMAGE;
		image.onload = () => {
			context?.drawImage(image, 0, 0);
		};
	};

	return (
		<>
			<canvas
				onMouseDown={startDrawing}
				onMouseUp={finishDrawing}
				onMouseMove={draw}
				ref={canvasRef}
			></canvas>
			<button onClick={clearCanvas}>Brisi</button>
		</>
	);
};

export default Canvas;
