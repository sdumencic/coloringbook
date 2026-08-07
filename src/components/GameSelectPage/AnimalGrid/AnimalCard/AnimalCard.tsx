import type * as React from 'react'
import { Link } from 'react-router-dom'

import { useSettingsStore } from '@/store/Settings'

import { strings } from '../../../../util/language'
import './AnimalCard.css'

interface IImageProps {
  style?: React.CSSProperties
  id: number
  difficulty: number
  name: string
  image: string
}

const AnimalCard = (props: IImageProps) => {
  const language = useSettingsStore((s) => s.language)

  const difficultyClass = ['easy', 'medium', 'hard']

  return (
    <div className="card" style={props.style}>
      <Link to={`/game/${props.id}`} className="card-body">
        <div className={`difficulty ${difficultyClass[props.difficulty]}`}>
          <div className="text">{strings[language].gameSelectPage.difficulty[props.difficulty]}</div>
          <div className="stars">{'⭐'.repeat(props.difficulty + 1)}</div>
        </div>
        <img className="card-img-top" src={props.image} alt="Card image cap" />
        <h5 className="card-title">{props.name}</h5>
      </Link>
    </div>
  )
}

export default AnimalCard
