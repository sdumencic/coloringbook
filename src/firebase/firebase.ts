import { child, get } from 'firebase/database'

import { useAnimalsStore } from '@/store/Animals'

import { projectDatabase } from './config'

/** Load the problems from the database */
export const loadAnimals = async () => {
  const animals = useAnimalsStore.getState().animals

  if (!(Array.isArray(animals) && animals.length)) {
    // Get data from the Database
    get(child(projectDatabase, 'animals'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          useAnimalsStore.getState().updateAnimals(data)
        } else {
          console.error('No data available')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
