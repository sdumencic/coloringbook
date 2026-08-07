import { useEffect, useMemo, useState } from 'react'
import { FcUndo } from 'react-icons/fc'
import { FiSettings } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { useAnimalsStore } from '@/store/Animals'
import { useSettingsStore } from '@/store/Settings'

import { loadAnimals } from '../../firebase/firebase'
import { strings } from '../../util/language'
import FloatingButton from '../Shared/FloatingButton/FloatingButton'
import AnimalGrid from './AnimalGrid/AnimalGrid'
import './GameSelectPage.css'

type TAnimalCategory = 'all' | 'wild' | 'domestic'

const GameSelectPage = () => {
  const language = useSettingsStore((s) => s.language)
  const animals = useAnimalsStore((s) => s.animals)

  const [category, setCategory] = useState<TAnimalCategory>('all')

  // When component is mounted, add the problems into the problems global state
  useEffect(() => {
    loadAnimals()
  }, [])

  const filteredAnimals = useMemo(() => {
    return animals
      .filter((animal) => {
        if (category === 'all' || animal.category === category) return animal
      })
      .sort((a, b) => a.difficulty - b.difficulty)
  }, [animals, category])

  return (
    <div className="selectBackground">
      <form className="imgContainer">
        <div className="loginformheader">
          <div className="buttons">
            <div className={`button ${category === 'all' ? 'active' : ''}`} onClick={() => setCategory('all')}>
              {strings[language].gameSelectPage.allAnimals}
            </div>
            <div
              className={`button ${category === 'domestic' ? 'active' : ''}`}
              onClick={() => setCategory('domestic')}
            >
              {strings[language].gameSelectPage.domesticAnimals}
            </div>
            <div className={`button ${category === 'wild' ? 'active' : ''}`} onClick={() => setCategory('wild')}>
              {strings[language].gameSelectPage.wildAnimals}
            </div>
          </div>
        </div>
        <AnimalGrid animals={filteredAnimals} />
      </form>
      <Link to="/">
        <FloatingButton
          icon={<FcUndo size={30} className="floating-button-icon" />}
          style={{ top: '10px', left: '10px' }}
        />
      </Link>
      <Link to="/settings">
        <FloatingButton
          icon={<FiSettings size={30} className="floating-button-icon" />}
          style={{ top: '10px', right: '10px' }}
        />
      </Link>
    </div>
  )
}

export default GameSelectPage
