import "./AnimalGrid.scss";

import { Animal } from "../../../redux/reducers/AnimalsReducer";
import AnimalCard from "./AnimalCard/AnimalCard";
import { GlobalState } from "../../../redux/store";
import { useSelector } from "react-redux";

interface AnimalGridProps {
	animals: Animal[];
}

const AnimalGrid = (props: AnimalGridProps) => {
	const { language } = useSelector((state: GlobalState) => state.settings);

	return (
		<div className="card-deck">
			{props.animals.map((animal, index) => (
				<AnimalCard
					key={`${animal}.${index}`}
					difficulty={animal.difficulty}
					name={animal.name[language]}
					image={animal.url.small}
				/>
			))}
		</div>
	);
};

export default AnimalGrid;
