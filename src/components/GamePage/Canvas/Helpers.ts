/**
 * An optional 2D point. It can have both X and/or Y undefined, be careful.
 */
export interface MousePosition {
	x: number;
	y: number;
}

/**
 * Clears the specified canvas with a clearRect function.
 * @param canvasRef Reference to the Canvas which will be cleared
 */
export const clearCanvas = (canvasRef: React.MutableRefObject<HTMLCanvasElement | null>) => {
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
 * Returns mouse position correctly scaled from the DOM coordinates to the internal canvas ones.
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
		const rectLeft = rect.left ? rect.left : 0;
		const rectTop = rect.top ? rect.top : 0;

		return {
			x: (clientX - rectLeft) * scaleX, // Scale mouse coordinates after they have
			y: (clientY - rectTop) * scaleY, // been adjusted to be relative to element
		};
	}

	// No coordinates have been found
	console.error("No mouse or touch coordinates found");
	return { x: 0, y: 0 };
};

/**
 * Returns the distance between two 2D (x,y) points.
 * @param point1 First position
 * @param point2 Second position
 * @returns Resulting distance between them
 */
export const distanceBetweenPoints = (point1: MousePosition, point2: MousePosition) => {
	return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
};

/**
 * Returns the angle between two 2D (x,y) points.
 * @param point1 First point
 * @param point2 Second point
 * @returns Resulting angle between them
 */
export const angleBetweenPoints = (point1: MousePosition, point2: MousePosition) => {
	return Math.atan2(point2.x - point1.x, point2.y - point1.y);
};
