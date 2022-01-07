import "./Images.scss";
import Image from "./Image/Image";
import { MouseEvent, useEffect, useRef, useState } from "react";

const Images = () => {
	const IMAGE = "/images/parrot.png";

	return (
		<div className="card-deck">
			<div className="card">
				<div className="card-body">
					<img className="card-img-top" src={IMAGE} alt="Card image cap" />
					<h5 className="card-title">Card title</h5>
				</div>
			</div>
			<div className="card">
				<div className="card-body">
					<img className="card-img-top" src={IMAGE} alt="Card image cap" />
					<h5 className="card-title">Card title</h5>
				</div>
			</div>
			<div className="card">
				<div className="card-body">
					<img className="card-img-top" src={IMAGE} alt="Card image cap" />
					<h5 className="card-title">Card title</h5>
				</div>
			</div>
			<div className="card">
				<div className="card-body">
					<img className="card-img-top" src={IMAGE} alt="Card image cap" />
					<h5 className="card-title">Card title</h5>
				</div>
			</div>
			<div className="card">
				<div className="card-body">
					<img className="card-img-top" src={IMAGE} alt="Card image cap" />
					<h5 className="card-title">Card title</h5>
				</div>
			</div>
			<div className="card">
				<div className="card-body">
					<img className="card-img-top" src={IMAGE} alt="Card image cap" />
					<h5 className="card-title">Card title</h5>
				</div>
			</div>
			<div className="card">
				<div className="card-body">
					<img className="card-img-top" src={IMAGE} alt="Card image cap" />
					<h5 className="card-title">Card title</h5>
				</div>
			</div>
			<div className="card">
				<div className="card-body">
					<img className="card-img-top" src={IMAGE} alt="Card image cap" />
					<h5 className="card-title">Card title</h5>
				</div>
			</div>
			<div className="card">
				<div className="card-body">
					<img className="card-img-top" src={IMAGE} alt="Card image cap" />
					<h5 className="card-title">Card title</h5>
				</div>
			</div>
			<div className="card">
				<div className="card-body">
					<img className="card-img-top" src={IMAGE} alt="Card image cap" />
					<h5 className="card-title">Card title</h5>
				</div>
			</div>
			<div className="card" style={{ visibility: "hidden" }}>
				<div className="card-body">
					<img className="card-img-top" src={IMAGE} alt="Card image cap" />
					<h5 className="card-title">Card title</h5>
				</div>
			</div>
			<div className="card" style={{ visibility: "hidden" }}>
				<div className="card-body">
					<img className="card-img-top" src={IMAGE} alt="Card image cap" />
					<h5 className="card-title">Card title</h5>
				</div>
			</div>
		</div>
	);
};

export default Images;
