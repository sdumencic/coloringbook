/**
 * An optional 2D point. It can have both X and/or Y undefined, be careful.
 */
// eslint-disable-next-line
export interface MousePosition {
	x: number;
	y: number;
}

/**
 * Clears the specified canvas with a clearRect function.
 * @param canvasRef Reference to the Canvas which will be cleared
 */
export const clearCanvas = (
	canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
) => {
	if (canvasRef.current) {
		const Canvas = canvasRef.current;
		const Context = Canvas.getContext("2d");

		if (Context) {
			Context.clearRect(0, 0, Canvas.width, Canvas.height);
		}
	}
};

/**
 * Set canvas brush to the specified width, color and cap.
 * @param canvasRef Reference to the canvas which settings will be changed
 * @param width Width of the canvas brush.
 * @param color Color of the canvas brush.
 * @param cap Cap of the canvas brush.
 */
export const setBrush = (
	canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
	color?: string | CanvasGradient | CanvasPattern,
	width?: number,
	cap?: CanvasLineCap
) => {
	if (canvasRef.current) {
		const Canvas = canvasRef.current;
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
 * @param clientX X coordinate of a mouse click or touch press
 * @param clientY Y coordinate of a mouse click or touch press
 * @returns MousePosition (x, y) interface with correctly scaled position
 */
export const getMousePos = (
	canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
	clientX: number,
	clientY: number
): MousePosition => {
	const canvas = canvasRef.current;

	if (canvas) {
		const rect = canvas.getBoundingClientRect(); // Abs. size of element
		const scaleX = canvas.width / rect.width; // Relationship bitmap vs. element for X
		const scaleY = canvas.height / rect.height; // Relationship bitmap vs. element for Y

		return {
			x: (clientX - rect!.left) * scaleX, // Scale mouse coordinates after they have
			y: (clientY - rect!.top) * scaleY, // been adjusted to be relative to element
		};
	}

	// No coordinates have been found
	console.error("No mouse or touch coordinates found");
	return { x: 0, y: 0 };
};
