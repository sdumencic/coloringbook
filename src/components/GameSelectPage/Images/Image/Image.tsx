import "./Image.scss";

import * as React from "react";

import { AiFillStar } from "react-icons/ai";

interface ImageProps {
	style?: React.CSSProperties;
}

const Image = (props: ImageProps) => {
	const IMAGE = "/images/papiga_small1.png";

	return (
		<div className="card" style={props.style}>
			<div className="card-body">
				<div className="difficulty">
					<div className="text">Teško</div>
					<div className="stars">⭐⭐⭐</div>
				</div>
				<img className="card-img-top" src={IMAGE} alt="Card image cap" />
				<h5 className="card-title">Papiga</h5>
			</div>
		</div>
	);
};

export default Image;

{
	/* <div className="card">
			<div className="card-body">
				<img className="card-img-top" src={IMAGE} alt="Card image cap" />
				<h5 className="card-title">Card title</h5>
			</div>
		</div> */
}
