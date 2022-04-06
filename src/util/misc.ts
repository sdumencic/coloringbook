/**
 * Delay execution of the function by the set time
 * @param func Function which you want to delay
 * @param delay How much to delay its start in milliseconds
 */
export const debounce = (func: TimerHandler, delay: number) => {
	let timer: number | undefined;

	return () => {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(func, delay);
	};
};

export type JSONStringList = {
	// eslint-disable-next-line
	[key: string]: any;
};
