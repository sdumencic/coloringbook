import "./AnimalCard.scss";

import * as React from "react";

import { GlobalState } from "../../../../redux/store";
import { strings } from "../../../../util/language";
import { useSelector } from "react-redux";

interface ImageProps {
	style?: React.CSSProperties;
	difficulty: number;
	name: string;
	image: string;
}

const AnimalCard = (props: ImageProps) => {
	const { language } = useSelector((state: GlobalState) => state.settings);

	const difficultyClass = ["easy", "medium", "hard"];

	return (
		<div className="card" style={props.style}>
			<div className="card-body">
				<div className={`difficulty ${difficultyClass[props.difficulty]}`}>
					<div className="text">
						{strings[language].gameSelectPage.difficulty[props.difficulty]}
					</div>
					<div className="stars">{"⭐".repeat(props.difficulty + 1)}</div>
				</div>
				<img className="card-img-top" src={props.image} alt="Card image cap" />
				<h5 className="card-title">{props.name}</h5>
			</div>
		</div>
	);
};

export default AnimalCard;
