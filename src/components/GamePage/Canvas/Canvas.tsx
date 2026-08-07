import { type CSSProperties, type MouseEvent, type TouchEvent, useEffect, useMemo, useRef, useState } from 'react'

import { useActionsStore } from '@/store/Actions'
import { useBrushStore } from '@/store/Brush'
import { useClientStore } from '@/store/Client'
import { useGameStore } from '@/store/Game'
import { useSettingsStore } from '@/store/Settings'

import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner'
import './Canvas.css'
import { CANVAS_BASE_WIDTH, CANVAS_BRUSH_CAP, CANVAS_HEIGHT, CANVAS_WIDTH } from './Constants'
import {
  type IMousePosition,
  angleBetweenPoints,
  clearCanvas,
  compareReal,
  createCanvas,
  distanceBetweenPoints,
  downloadCanvas,
  getMousePos,
  getRealPixelCount,
  loadImageToState,
  loadRawImageArrayToState,
  setBrush
} from './Helpers'

interface ICanvasProps {
  outlineImageURL: string
  maskImageURL: string
  bigImageURL: string
  name: string
}

const Canvas = (props: ICanvasProps) => {
  // SECTION: Slices from the global state
  const settingsDrawMode = useSettingsStore((s) => s.draw_mode)
  const settingsIsFirefox = useSettingsStore((s) => s.isFirefox)

  const clientHeight = useClientStore((s) => s.height)
  const clientWidth = useClientStore((s) => s.width)

  const brushWidth = useBrushStore((s) => s.width)
  const brushColor = useBrushStore((s) => s.color)

  const clearCanvasTrigger = useActionsStore((s) => s.clearCanvas)
  const saveImageTrigger = useActionsStore((s) => s.saveImage)

  const scoreGame = useGameStore((s) => s.scoreGame)

  // SECTION: Internal state
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPoint, setLastPoint] = useState<IMousePosition | null>(null)

  // SECTION: Loaded images
  const [imageOutline, setImageOutline] = useState<HTMLImageElement | null>(null)
  const [imageMask, setImageMask] = useState<HTMLImageElement | null>(null)
  const [imageBigArray, setImageBigArray] = useState<Uint8ClampedArray | null>(null)
  const [imageBigPixelCount, setImageBigPixelCount] = useState(0)

  const allImagesLoaded = useMemo(() => {
    return imageOutline && imageMask && imageBigArray
  }, [imageOutline, imageMask, imageBigArray])

  // SECTION: Canvas references
  const BGCanvasRef = useRef<HTMLCanvasElement | null>(null) // Background
  const DataCanvasRef = useRef<HTMLCanvasElement | null>(null) // Our drawn data
  const FGCanvasRef = useRef<HTMLCanvasElement | null>(null) // Outline

  // SECTION: Canvas Actions
  useEffect(() => {
    clearCanvas(DataCanvasRef)
    scoreGame(0)
  }, [clearCanvasTrigger])

  useEffect(() => {
    if (allImagesLoaded) downloadCanvas(FGCanvasRef, props.name)
  }, [saveImageTrigger])

  // NOTE: Initial Load
  useEffect(() => {
    loadImageToState(props.outlineImageURL, imageOutline, setImageOutline)
    loadImageToState(props.maskImageURL, imageMask, setImageMask)
    loadRawImageArrayToState(props.bigImageURL, CANVAS_WIDTH, CANVAS_HEIGHT, setImageBigArray)
    createCanvas(DataCanvasRef, CANVAS_WIDTH, CANVAS_HEIGHT)
    // eslint-disable-next-line
  }, [])

  const mainCanvasStyle: CSSProperties = useMemo(
    () => ({
      width: clientHeight > clientWidth ? '100%' : `${clientHeight}px`,
      height: clientHeight > clientWidth ? `${clientWidth}px` : '100%',
      top: clientHeight > clientWidth ? `${(clientHeight - clientWidth) / 2}px` : 0,
      left: clientHeight > clientWidth ? 0 : `${(clientWidth - clientHeight) / 2}px`
    }),
    [clientHeight, clientWidth]
  )

  const renderLoop = () => {
    // Set up the variables
    const BGCanvas = BGCanvasRef.current
    const BGContext = BGCanvasRef.current?.getContext('2d', { willReadFrequently: true })
    const FGCanvas = FGCanvasRef.current
    const FGContext = FGCanvas?.getContext('2d', { willReadFrequently: true })
    const DataCanvas = DataCanvasRef.current

    if (BGCanvas && BGContext && FGCanvas && FGContext && DataCanvas && imageOutline && imageMask) {
      // Draw Background
      BGContext.fillStyle = 'rgb(220,255,244)'
      BGContext?.fillRect(0, 0, BGCanvas.width, BGCanvas.height)

      // Clear the canvas and draw the mask
      FGContext.globalCompositeOperation = 'source-over'
      FGContext?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      FGContext?.drawImage(imageMask, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      // Fill in the drawing data
      FGContext.globalCompositeOperation = 'source-in'
      FGContext?.drawImage(DataCanvas, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      // Draw outline and fill non painted parts with a mask
      FGContext.globalCompositeOperation = 'source-over'
      FGContext?.drawImage(imageOutline, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      FGContext.globalCompositeOperation = 'destination-over'
      FGContext?.drawImage(imageMask, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    }

    window.requestAnimationFrame(renderLoop)
  }

  const compareImages = () => {
    const FGImageData = FGCanvasRef.current
      ?.getContext('2d', { willReadFrequently: true })
      ?.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    if (FGImageData && imageBigArray) {
      scoreGame(compareReal(imageBigArray, FGImageData.data, imageBigPixelCount))
    }
  }

  const startStopToggleMode = ({ nativeEvent: { clientX, clientY } }: MouseEvent) => {
    if (settingsDrawMode === 'toggle') {
      if (isDrawing) {
        setIsDrawing(false)
        setLastPoint(null)
        compareImages()
      } else {
        setIsDrawing(true)
        const { x, y } = getMousePos(FGCanvasRef, clientX, clientY)
        drawCircle(x, y, false)
      }
    }
  }

  const mouseDown = ({ nativeEvent: { clientX, clientY } }: MouseEvent) => {
    startHoldMode(clientX, clientY)
  }

  const touchStart = ({ nativeEvent: { touches } }: TouchEvent) => {
    startHoldMode(touches[0].clientX, touches[0].clientY)
  }

  const startHoldMode = (clientX: number, clientY: number) => {
    if (settingsDrawMode === 'hold') {
      setIsDrawing(true)
      const { x, y } = getMousePos(FGCanvasRef, clientX, clientY)
      drawCircle(x, y, false)
    }
  }

  const stopHoldMode = () => {
    if (settingsDrawMode === 'hold' && isDrawing) {
      setLastPoint(null)
      setIsDrawing(false)
      compareImages()
    }
  }

  const touchMove = (event: TouchEvent) => {
    drawMove(event.nativeEvent.touches[0].clientX, event.nativeEvent.touches[0].clientY)
  }

  const mouseMove = ({ nativeEvent: { clientX, clientY } }: MouseEvent) => {
    drawMove(clientX, clientY)
  }

  const drawMove = (clientX: number, clientY: number) => {
    if (!isDrawing) return

    const currentPoint = getMousePos(FGCanvasRef, clientX, clientY)

    if (lastPoint !== null) {
      const dist = distanceBetweenPoints(lastPoint, currentPoint)
      const angle = angleBetweenPoints(lastPoint, currentPoint)

      for (let i = 0; i < dist; i += 5) {
        const x = lastPoint.x + Math.sin(angle) * i - 25
        const y = lastPoint.y + Math.cos(angle) * i - 25
        drawCircle(x, y)
      }
    }

    setLastPoint(currentPoint)
  }

  const drawCircle = (x: number, y: number, correctBrush = true) => {
    const Context = DataCanvasRef.current?.getContext('2d', { willReadFrequently: true })
    const brushOffset = correctBrush ? ((brushWidth + 1) * CANVAS_BASE_WIDTH) / 2 : 0

    if (!Context) return

    Context.beginPath()
    Context.arc(x + brushOffset, y + brushOffset, 0, 0, Math.PI * 2, false)
    if (settingsIsFirefox) {
      // NOTE: HACK!!! Despite fill() and stroke() methods calling closePath() internally
      // Firefox won't draw unless we explicitly close the path with closePath()
      // HOWEVER Chrome WILL NOT DRAW ANYTHING if we call the closePath() before fill()
      // or stroke(). Which is why do this Hack based on user agent parsing.
      Context.closePath()
    }
    Context.fill()
    Context.stroke()
  }

  // Brush settings
  useEffect(() => {
    setBrush(DataCanvasRef, brushColor, (brushWidth + 1) * CANVAS_BASE_WIDTH, CANVAS_BRUSH_CAP)
  }, [DataCanvasRef, brushColor, brushWidth])

  useEffect(() => {
    // Start the render Loop after the images have been loaded
    if (allImagesLoaded) {
      window.requestAnimationFrame(renderLoop)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setImageBigPixelCount(getRealPixelCount(imageBigArray!))
    }
  }, [imageOutline, imageMask, imageBigArray])

  return (
    <>
      {!allImagesLoaded && <LoadingSpinner bgColor={'rgb(220, 255, 254)'} textColor="#4357a5" spinnerColor="#3085d6" />}
      <div className="viewport">
        <canvas
          className="background"
          height={clientHeight}
          width={clientWidth}
          ref={BGCanvasRef}
          onMouseMove={stopHoldMode}
        ></canvas>
        <canvas
          style={mainCanvasStyle}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onClick={startStopToggleMode}
          onMouseDown={mouseDown}
          onTouchStart={touchStart}
          onMouseMove={mouseMove}
          onTouchMove={touchMove}
          onMouseUp={stopHoldMode}
          onTouchEnd={stopHoldMode}
          ref={FGCanvasRef}
        ></canvas>
      </div>
    </>
  )
}

export default Canvas
