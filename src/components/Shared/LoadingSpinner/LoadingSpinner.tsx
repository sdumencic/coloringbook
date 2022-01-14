import "./LoadingSpinner.scss";

import { GlobalState } from "../../../redux/store";
import { ImSpinner9 } from "react-icons/im";
import { strings } from "../../../util/language";
import { useSelector } from "react-redux";

interface LoadingSpinnerProps {
	bgColor?: string;
}

const LoadingSpinner = (props: LoadingSpinnerProps) => {
	const language = useSelector((state: GlobalState) => state.settings.language);
	const client = useSelector((state: GlobalState) => state.client);

	const size = Math.min(client.width, client.height) / 3;

	return (
		<div className="loading-spinner" style={{ backgroundColor: props.bgColor }}>
			<ImSpinner9
				style={{
					top: `${(client.height - size) / 2}px`,
					left: `${(client.width - size) / 2}px`,
				}}
				size={size}
			/>
			<h2
				style={{
					width: size,
					top: `${(client.height + size) / 2}px`,
					left: `${(client.width - size) / 2}px`,
				}}
			>
				{strings[language].misc.loading}
			</h2>
		</div>
	);
};

export default LoadingSpinner;
