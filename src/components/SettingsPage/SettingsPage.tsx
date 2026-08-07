import type { ChangeEvent } from 'react'
import { BsBrush } from 'react-icons/bs'
import { FcSpeaker, FcUndo, FcVoicePresentation } from 'react-icons/fc'
import { HiOutlineCursorClick } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

import { useActionsStore } from '@/store/Actions'
import { useSettingsStore } from '@/store/Settings'

import { strings } from '../../util/language'
import FloatingButton from '../Shared/FloatingButton/FloatingButton'
import './SettingsPage.css'
import Switch from './Switch/Switch'

const BritishFlag = 'images/BritishFlag.png'
const CroatianFlag = 'images/CroatianFlag.png'
const GermanFlag = 'images/GermanFlag.png'

const SettingsPage = () => {
  const navigate = useNavigate()

  const sound_volume = useSettingsStore((s) => s.sound_volume)
  const language = useSettingsStore((s) => s.language)
  const draw_mode = useSettingsStore((s) => s.draw_mode)
  const setLanguage = useSettingsStore((s) => s.setLanguage)
  const setSoundVolume = useSettingsStore((s) => s.setSoundVolume)
  const setDrawMode = useSettingsStore((s) => s.setDrawMode)

  const locationCount = useActionsStore((s) => s.locationCount)

  const flagClicked = (country: 'en' | 'hr' | 'de') => {
    if (country !== language) {
      setLanguage(country)
    }
  }

  const volumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSoundVolume(Number(event.target.value))
  }

  const drawModeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDrawMode(event.target.checked ? 'hold' : 'toggle')
  }

  return (
    <div className="settings">
      <h2>{strings[language].settingsPage.mode}</h2>
      <Switch
        checked={draw_mode === 'hold'}
        onChange={drawModeChange}
        leftIcon={<HiOutlineCursorClick size={30} />}
        rightIcon={<BsBrush size={30} />}
      />

      <h1>
        <FcSpeaker size={70} />
      </h1>

      <div className="animation">
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={sound_volume}
          className="slider"
          onChange={volumeChange}
        />
      </div>

      <h1>
        <FcVoicePresentation size={70} />
      </h1>

      <div className="flex">
        <div className={`item ${language !== 'hr' ? '' : 'active'}`} onClick={() => flagClicked('hr')}>
          <img src={CroatianFlag} alt={strings[language].settingsPage.hr} />
          <h2>{strings[language].settingsPage.hr}</h2>
        </div>
        <div className={`item ${language !== 'en' ? '' : 'active'}`} onClick={() => flagClicked('en')}>
          <img src={BritishFlag} alt={strings[language].settingsPage.en} />
          <h2>{strings[language].settingsPage.en}</h2>
        </div>
        <div className={`item ${language !== 'de' ? '' : 'active'}`} onClick={() => flagClicked('de')}>
          <img src={GermanFlag} alt={strings[language].settingsPage.de} />
          <h2>{strings[language].settingsPage.de}</h2>
        </div>
      </div>

      <FloatingButton
        icon={<FcUndo size={30} className="floating-button-icon" />}
        style={{ top: '10px', left: '10px' }}
        onClick={() => (locationCount <= 1 ? navigate('/') : navigate(-1))}
      />
    </div>
  )
}

export default SettingsPage
