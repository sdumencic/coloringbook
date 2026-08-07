import { Fireworks } from '@fireworks-js/react'
import { type CSSProperties, Fragment, useState } from 'react'
import { AiOutlineSave } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { FaMedal } from 'react-icons/fa'
import { FcUndo } from 'react-icons/fc'
import { ImUndo2 } from 'react-icons/im'
import { Link } from 'react-router-dom'

import { useActionsStore } from '@/store/Actions'
import { useAnimalsStore } from '@/store/Animals'
import { useBrushStore } from '@/store/Brush'
import { useClientStore } from '@/store/Client'
import { useGameStore } from '@/store/Game'
import { useSettingsStore } from '@/store/Settings'

import { strings } from '../../../util/language'
import FloatingButton from '../../Shared/FloatingButton/FloatingButton'
import './HUD.css'

const SMALL_BRUSH = '/images/small.png'
const MEDIUM_BRUSH = '/images/medium.png'
const LARGE_BRUSH = '/images/big.png'

const BRONZE_MEDAL = '/images/bronce.png'
const SILVER_MEDAL = '/images/silver.png'
const GOLD_MEDAL = '/images/gold.png'

const HUD = () => {
  // Load info from the global state
  const gameScore = useGameStore((s) => s.score)
  const gameSelectedId = useGameStore((s) => s.selectedId)

  const animals = useAnimalsStore((s) => s.animals)

  const brushColor = useBrushStore((s) => s.color)
  const setBrushColor = useBrushStore((s) => s.setBrushColor)
  const brushWidth = useBrushStore((s) => s.width)
  const setBrushWidth = useBrushStore((s) => s.setBrushWidth)

  const language = useSettingsStore((s) => s.language)
  const sound_volume = useSettingsStore((s) => s.sound_volume)

  const clientWidth = useClientStore((s) => s.width)
  const clientHeight = useClientStore((s) => s.height)

  const _clearCanvas = useActionsStore((s) => s.doClearCanvas)
  const _saveImage = useActionsStore((s) => s.doSaveImage)

  // SECTION: Local state
  const [showMedal, setShowMedal] = useState(false)

  const fireworksOptions = {
    speed: 5,
    acceleration: 1.0,
    friction: 0.95,
    particles: 500,
    delay: { min: 10, max: 25 },
    hue: { min: 0, max: gameScore >= 85 ? 360 : gameScore >= 65 ? 180 : 0 },
    sound: {
      enabled: true,
      files: [
        'https://fireworks.js.org/sounds/explosion0.mp3',
        'https://fireworks.js.org/sounds/explosion1.mp3',
        'https://fireworks.js.org/sounds/explosion2.mp3'
      ],
      volume: {
        min: (1 * sound_volume) / 100,
        max: (2 * sound_volume) / 100
      }
    }
  }

  const fireworksStyle: CSSProperties = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none'
  }

  /**
   * Set the color from the brush pallete :)
   * @param index Index of the brush from the brush pallete
   */
  const setColor = (index: number) => {
    setBrushColor(animals[gameSelectedId].colors[index])
  }

  /**
   *
   * @param size Careful it must be 0-2
   */
  const setWidth = (size: number) => {
    if (size >= 0 && size <= 2) {
      setBrushWidth(size as 0 | 1 | 2)
    }
  }

  const clearCanvas = () => {
    _clearCanvas()
  }

  const saveImage = () => {
    _saveImage()
  }

  const renderColors = () => {
    const colors = animals[gameSelectedId].colors.map((color, index) => (
      <Fragment key={`brushColors-${color}-${index}`}>
        <button
          type="button"
          className={brushColor === color ? 'selected' : ''}
          style={{ backgroundColor: `${color}` }}
          onClick={() => setColor(index)}
        ></button>
        <br />
      </Fragment>
    ))

    return (
      // TODO: Make these styles responsive
      <div className="HUD" style={{ left: '10px', top: '120px' }}>
        <h2>{strings[language].hud.color}</h2>
        {colors}
      </div>
    )
  }

  const renderWidths = () => {
    const widthNames = [SMALL_BRUSH, MEDIUM_BRUSH, LARGE_BRUSH]
    const widths = widthNames.map((width, index) => (
      <Fragment key={`brushWidths-${width}-${index}`}>
        <button
          type="button"
          className={`back ${brushWidth === index ? 'selected' : ''}`}
          onClick={() => setWidth(index)}
        >
          <img className="width-img" src={width} />
        </button>
        <br />
      </Fragment>
    ))

    return (
      <div className="HUD" style={{ right: '10px', top: '310px' }}>
        <h2>{strings[language].hud.brush}</h2>
        {widths}
      </div>
    )
  }

  /**
   * Renders top of the screen toolbar with back button and other actions
   * @returns Top Toolbar JSX Element
   */
  const renderToolbar = () => {
    const medalStyle = gameScore >= 85 ? 'gold' : gameScore >= 65 ? 'silver' : 'bronze'
    const renderMedalButton = gameScore >= 40

    return (
      <div className="HUD" style={{ left: '10px' }}>
        <Link to="/game">
          <button type="button" className="back">
            <ImUndo2 size={30} />
          </button>
        </Link>
        <button type="button" onClick={clearCanvas} className="delete">
          <BsTrash size={30} />
        </button>
        <button type="button" onClick={saveImage} className="save">
          <AiOutlineSave size={30} />
        </button>
        {renderMedalButton && (
          <button type="button" onClick={() => setShowMedal(true)} className={medalStyle}>
            <FaMedal size={30} />
          </button>
        )}
      </div>
    )
  }

  const renderPreview = () => {
    return (
      <div className="HUD" style={{ top: '10px', right: '10px' }}>
        <h2 className="slim">{animals[gameSelectedId].name[language]}</h2>
        <img className="preview" src={animals[gameSelectedId].url.small}></img>
      </div>
    )
  }

  const renderPopup = () => {
    const border = 20
    const width = 200
    const height = 270
    const top = (clientHeight - height - border) / 2
    const right = (clientWidth - width - border) / 2
    const medalStyle = gameScore >= 85 ? 'gold' : gameScore >= 65 ? 'silver' : 'bronze'
    const medalImage = gameScore >= 85 ? GOLD_MEDAL : gameScore >= 65 ? SILVER_MEDAL : BRONZE_MEDAL

    return (
      <>
        <div className="blocker" onClick={() => setShowMedal(false)}></div>
        <div
          className="HUD"
          style={{ width: `${width}px`, height: `${height}px`, top: `${top}px`, right: `${right}px` }}
        >
          <h2 className="slim">{strings[language].misc.congrats}</h2>
          <img className={`medal ${medalStyle}`} src={medalImage}></img>
        </div>
        <FloatingButton
          icon={<FcUndo size={30} className="floating-button-icon" />}
          style={{ top: '10px', left: '10px' }}
          onClick={() => setShowMedal(false)}
        />
      </>
    )
  }

  if (showMedal) {
    return (
      <>
        {renderPopup()}
        <Fireworks style={fireworksStyle} options={fireworksOptions} />
      </>
    )
  }

  return (
    <>
      {renderToolbar()}
      {renderColors()}
      {renderWidths()}
      {renderPreview()}
    </>
  )
}

export default HUD
