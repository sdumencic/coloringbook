import "./Images.scss";

import { MouseEvent, useEffect, useRef, useState } from "react";

import Image from "./Image/Image";

const Images = () => {
	return (
		<div className="card-deck">
			<Image />
			<Image />
			<Image />
			<Image />
			<Image />
			<Image />
			<Image />
			<Image />
			<Image />
			<Image />
			<Image />
			<Image />
			<Image style={{ visibility: "collapse" }} />
		</div>
	);
};

export default Images;
