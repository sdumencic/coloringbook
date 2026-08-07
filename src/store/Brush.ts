import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { getZustandDevtoolsEnabled } from '@/util/env'

interface IBrushProps {
  /**
   * Represents the size of the brush:
   *
   * 0 - Small; 1 - Normal; 2 - Large
   */
  width: 0 | 1 | 2
  /**
   * Represents the color of the brush.
   * Can be an RGB string, canvas gradient or pattern.
   */
  color: string
}

const INITIAL_BRUSH_PROPS: IBrushProps = {
  width: 1,
  color: 'white'
}

interface IBrushStore extends IBrushProps {
  setBrushWidth: (width: IBrushProps['width']) => void
  setBrushColor: (color: IBrushProps['color']) => void
}

export const useBrushStore = create<IBrushStore>()(
  devtools(
    (set, _get) => ({
      ...INITIAL_BRUSH_PROPS,
      setBrushWidth(width) {
        set((state) => ({ ...state, width }), undefined, 'setBrushWidth')
      },
      setBrushColor(color) {
        set((state) => ({ ...state, color }), undefined, 'setBrushColor')
      }
    }),
    {
      name: 'brushStore',
      enabled: getZustandDevtoolsEnabled()
    }
  )
)
