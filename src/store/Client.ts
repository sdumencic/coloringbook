import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { getZustandDevtoolsEnabled } from '@/util/env'

interface IClientProps {
  width: number
  height: number
}

const INITIAL_CLIENT_PROPS: IClientProps = {
  width: window.innerWidth ?? 0,
  height: window.innerHeight ?? 0
}

interface IClientStore extends IClientProps {
  resize: (width: IClientProps['width'], height: IClientProps['height']) => void
}

export const useClientStore = create<IClientStore>()(
  devtools(
    (set, _get) => ({
      ...INITIAL_CLIENT_PROPS,
      resize: (width, height) => {
        set({ width, height }, undefined, 'resize')
      }
    }),
    {
      name: 'clientStore',
      enabled: getZustandDevtoolsEnabled()
    }
  )
)
