import type { TAnimal } from '@/store/Animals'
import { useSettingsStore } from '@/store/Settings'

import AnimalCard from './AnimalCard/AnimalCard'
import './AnimalGrid.css'

interface IAnimalGridProps {
  animals: TAnimal[]
}

const AnimalGrid = (props: IAnimalGridProps) => {
  const language = useSettingsStore((s) => s.language)

  return (
    <div className="card-deck">
      {props.animals.map((animal, index) => (
        <AnimalCard
          id={animal.id}
          key={`${animal}.${index}`}
          difficulty={animal.difficulty}
          name={animal.name[language]}
          image={animal.url.small}
        />
      ))}
    </div>
  )
}

export default AnimalGrid
