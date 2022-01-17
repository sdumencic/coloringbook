/**
 * An optional 2D point. It can have both X and/or Y undefined, be careful.
 */
export interface MousePosition {
	x: number;
	y: number;
}

/**
 * Creates a canvas in the provided reference if it does not already exist.
 * @param canvasRef Reference into which to save a canvas
 * @param width Width of the canvas
 * @param height Height of the canvas
 */
export const createCanvas = (
	canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
	width: number,
	height: number
) => {
	if (!canvasRef.current) {
		const Canvas = document.createElement("canvas");
		Canvas.width = width;
		Canvas.height = height;
		canvasRef.current = Canvas;
	}
};

export const loadRawImageArrayToState = (
	sourceURL: string,
	canvasWidth: number,
	canvasHeight: number,
	dispatch: React.Dispatch<React.SetStateAction<Uint8ClampedArray | null>>
) => {
	const canvas = document.createElement("canvas");
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	const context = canvas.getContext("2d");

	if (context) {
		const image = new Image();
		image.src = sourceURL;
		image.crossOrigin = "anonymous";
		image.onload = () => {
			context.globalCompositeOperation = "source-over";
			context.clearRect(0, 0, canvasWidth, canvasHeight);
			context.drawImage(image, 0, 0, canvasWidth, canvasHeight);
			dispatch(context.getImageData(0, 0, canvasWidth, canvasHeight).data);
		};
	}
};

/**
 * Loads the image and saves its element to react useState
 * @param sourceURL Source URL of the image we want to load
 * @param imageState Where the image element will be saved as returned by useState
 * @param setImageState The function to save the image to state as returned by useState
 */
export const loadImageToState = (
	sourceURL: string,
	imageState: HTMLImageElement | null,
	setImageState: React.Dispatch<React.SetStateAction<HTMLImageElement | null>>
) => {
	if (!imageState) {
		const image = new Image();
		image.src = sourceURL;
		image.crossOrigin = "anonymous";
		image.onload = () => setImageState(image);
	}
};

/**
 * Downloads the provided canvas as a png file
 * @param canvasRef Canvas to download
 * @param fileName Default filename to use
 */
export const downloadCanvas = (canvasRef: React.MutableRefObject<HTMLCanvasElement | null>, fileName: string) => {
	if (canvasRef.current) {
		const link = document.createElement("a");
		link.download = `${fileName}.png`;
		link.href = canvasRef.current.toDataURL("image/png");
		link.click();
	}
};

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
 * @param canvasRef React reference to the canvas
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

export const typedArraySum = (array: Uint8ClampedArray) => {
	const sumFunc = (previousValue: number, currentValue: number) => {
		return previousValue + currentValue;
	};
	return array.reduce(sumFunc);
};

/**
 * Returns the number of drawable pixels (neither transparent, black or white)
 * @param array Clamped Array data from Canvas
 * @returns Number of pixels that are neither transparent, black or white
 */
export const getRealPixelCount = (array: Uint8ClampedArray) => {
	let sum = 0;

	for (let i = 0; i < array.length; i = i + 4) {
		const R = array[i];
		const G = array[i + 1];
		const B = array[i + 2];
		const A = array[i + 3];

		if (A !== 0) {
			if (!(R === 0 && G === 0 && B === 0)) {
				if (!(R === 255 && G === 255 && B === 255)) {
					sum++;
				}
			}
		}
	}

	return sum;
};

/**
 * Returns the number of non-alpha pixels
 * @param array Clamped Array data from canvas
 * @returns Number of non-alpha pixels
 */
export const getPixelCount = (array: Uint8ClampedArray) => {
	let sum = 0;

	for (let i = 0; i < array.length; i = i + 4) {
		const A = array[i + 3];

		if (A !== 0) {
			sum++;
		}
	}

	return sum;
};

export const compareReal = (originalArray: Uint8ClampedArray, copyArray: Uint8ClampedArray, realPixelCount = 0) => {
	let sum = 0;

	for (let i = 0; i < originalArray.length; i = i + 4) {
		const R = originalArray[i];
		const G = originalArray[i + 1];
		const B = originalArray[i + 2];
		const A = originalArray[i + 3];

		if (A !== 0) {
			if (!(R === 0 && G === 0 && B === 0)) {
				if (!(R === 255 && G === 255 && B === 255)) {
					if (copyArray[i] === R && copyArray[i + 1] === G && copyArray[i + 2] === B && copyArray[i + 3] === A) {
						sum++;
					}
				}
			}
		}
	}

	if (realPixelCount !== 0) return roundNumber(sum / realPixelCount, 2) * 100;

	return roundNumber(sum / getRealPixelCount(originalArray), 2) * 100;
};

/**
 * Round a number to the desired number of decimal places
 * @param num The number to round
 * @param places Nuber of decimal places after the dot
 * @returns The number rounded to defined number of decimal places
 */
export const roundNumber = (num: number, places: number) => {
	const pow = Math.pow(10, places);
	return Math.round((num + Number.EPSILON) * pow) / pow;
};
