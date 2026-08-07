import { UAParser } from 'ua-parser-js'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { getZustandDevtoolsEnabled } from '@/util/env'

const parser = new UAParser(window.navigator.userAgent)
const parserResults = parser.getResult()
const isFirefox = parserResults.browser.name === 'Firefox'

const MAX_VOLUME = 100
const MIN_VOLUME = 0

let language = 'hr'
if (localStorage.getItem('language')) {
  language = localStorage.getItem('language') as string
}
let sound_volume = 100
if (localStorage.getItem('volume')) {
  sound_volume = Number(localStorage.getItem('sound_volume') as string)
}
let draw_mode = 'toggle'
if (localStorage.getItem('draw_mode')) {
  draw_mode = localStorage.getItem('draw_mode') as string
}

export interface ISettingsProps {
  sound_volume: number
  language: string
  draw_mode: string
  isFirefox: boolean
}
const INITIAL_SETTINGS_PROPS: ISettingsProps = {
  sound_volume: sound_volume,
  language: language,
  draw_mode: draw_mode,
  isFirefox: isFirefox
}

interface ISettingsStore extends ISettingsProps {
  setSoundVolume: (volume: ISettingsProps['sound_volume']) => void
  setLanguage: (language: 'en' | 'hr' | 'de') => void
  setDrawMode: (draw_mode: 'toggle' | 'hold') => void
}

export const useSettingsStore = create<ISettingsStore>()(
  devtools(
    (set, _get) => ({
      ...INITIAL_SETTINGS_PROPS,
      setSoundVolume(volume) {
        const sound_volume = Math.max(Math.min(volume, MAX_VOLUME), MIN_VOLUME)
        localStorage.setItem('sound_volume', String(sound_volume))
        set({ sound_volume }, undefined, 'setSoundVolume')
      },
      setLanguage(language) {
        localStorage.setItem('language', language)
        set({ language }, undefined, 'setLanguage')
      },
      setDrawMode(draw_mode) {
        localStorage.setItem('draw_mode', draw_mode)
        set({ draw_mode }, undefined, 'setDrawMode')
      }
    }),
    {
      name: 'settingsStore',
      enabled: getZustandDevtoolsEnabled()
    }
  )
)
