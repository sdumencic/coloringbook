import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAnimalsStore } from '@/store/Animals'
import { useBrushStore } from '@/store/Brush'
import { useGameStore } from '@/store/Game'
import { useSettingsStore } from '@/store/Settings'

import Canvas from './Canvas/Canvas'
import HUD from './HUD/HUD'

const GamePage = () => {
  // Hooks
  const navigate = useNavigate()

  // Load information from the parameters
  const { id } = useParams() // Fetch the picture id
  const numId = isNaN(Number(id)) ? 0 : Number(id)

  // Load info from the global state
  const scoreGame = useGameStore((s) => s.scoreGame)
  const gameSelectedId = useGameStore((s) => s.selectedId)
  const setSelectedGameId = useGameStore((s) => s.setSelectedGameId)

  const brushColor = useBrushStore((s) => s.color)
  const setBrushColor = useBrushStore((s) => s.setBrushColor)

  const animals = useAnimalsStore((s) => s.animals)

  const language = useSettingsStore((s) => s.language)

  useEffect(() => {
    // Animals are not loaded, go to the selection screen
    if (numId >= animals.length) {
      navigate('/game')
    }
  }, [])

  // NOTE: We need to do this both in useEffect and in render since useEffect is running
  // while rendering.
  if (numId >= animals.length) {
    return null
  }

  if (gameSelectedId !== numId) {
    setSelectedGameId(numId)
    scoreGame(0)
  }

  // Check that brush is ok
  if (!animals[numId].colors.includes(brushColor)) {
    setBrushColor(animals[numId].colors[0])
  }

  return (
    <>
      <Canvas
        maskImageURL={animals[numId].url.mask}
        outlineImageURL={animals[numId].url.outline}
        bigImageURL={animals[numId].url.big}
        name={animals[numId].name[language]}
      />

      <HUD />
    </>
  )
}

export default GamePage
