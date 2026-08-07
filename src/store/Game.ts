import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { getZustandDevtoolsEnabled } from '@/util/env'

const MAX_SCORE = 100
const MIN_SCORE = 0

interface IGameProps {
  selectedId: number
  score: number
}

const INITIAL_GAME_PROPS: IGameProps = {
  selectedId: 0,
  score: MIN_SCORE
}

interface IGameStore extends IGameProps {
  setSelectedGameId: (id: IGameProps['selectedId']) => void
  scoreGame: (score: IGameProps['score']) => void
}

export const useGameStore = create<IGameStore>()(
  devtools(
    (set, _get) => ({
      ...INITIAL_GAME_PROPS,
      setSelectedGameId(id) {
        set({ selectedId: id }, undefined, 'setSelectedGameId')
      },
      scoreGame(score) {
        set(
          {
            score: Math.max(Math.min(score, MAX_SCORE), MIN_SCORE)
          },
          undefined,
          'scoreGame'
        )
      }
    }),
    {
      name: 'gameStore',
      enabled: getZustandDevtoolsEnabled()
    }
  )
)
