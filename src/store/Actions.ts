import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { getZustandDevtoolsEnabled } from '@/util/env'

interface IActionsProps {
  clearCanvas: number
  saveImage: number
  locationCount: number
}

const INITIAL_ACTIONS_PROPS: IActionsProps = {
  clearCanvas: 0,
  saveImage: 0,
  locationCount: 0
}

interface IActionsStore extends IActionsProps {
  doClearCanvas: () => void
  doSaveImage: () => void
  doSetLocationCount: () => void
}

// FIXME: This is very hackyy... very very hackyyy
export const useActionsStore = create<IActionsStore>()(
  devtools(
    (set, _get) => ({
      ...INITIAL_ACTIONS_PROPS,
      doClearCanvas() {
        set((state) => ({ clearCanvas: state.clearCanvas + 1 }), undefined, 'doClearCanvas')
      },
      doSaveImage() {
        set((state) => ({ saveImage: state.saveImage + 1 }), undefined, 'doSaveImage')
      },
      doSetLocationCount() {
        set((state) => ({ locationCount: state.locationCount + 1 }), undefined, 'doSetLocationCount')
      }
    }),
    {
      name: 'actionsStore',
      enabled: getZustandDevtoolsEnabled()
    }
  )
)
