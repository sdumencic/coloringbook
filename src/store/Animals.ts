import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { getZustandDevtoolsEnabled } from '@/util/env'
import type { TJSONStringList } from '@/util/misc'

export type TAnimal = {
  id: number
  difficulty: number
  colors: string[]
  category: string
  name: TJSONStringList
  url: TJSONStringList
}

interface IAnimalsProps {
  animals: TAnimal[]
}

const INITIAL_ANIMAL_PROPS: IAnimalsProps = {
  animals: []
}

interface IAnimalsStore extends IAnimalsProps {
  addAnimal: (animal: TAnimal) => void
  updateAnimals: (animals: TAnimal[]) => void
  clearAnimals: () => void
}

export const useAnimalsStore = create<IAnimalsStore>()(
  devtools(
    (set, _get) => ({
      ...INITIAL_ANIMAL_PROPS,
      addAnimal(animal) {
        set((state) => ({ animals: [...state.animals, animal] }), undefined, 'addAnimal')
      },
      updateAnimals(animals) {
        set({ animals }, undefined, 'updateAnimals')
      },
      clearAnimals() {
        set({ animals: [] }, undefined, 'clearAnimals')
      }
    }),
    {
      name: 'animalsStore',
      enabled: getZustandDevtoolsEnabled()
    }
  )
)
