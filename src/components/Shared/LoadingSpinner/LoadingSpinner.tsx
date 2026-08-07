import { ImSpinner9 } from 'react-icons/im'

import { useClientStore } from '@/store/Client'
import { useSettingsStore } from '@/store/Settings'

import { strings } from '../../../util/language'
import './LoadingSpinner.css'

interface ILoadingSpinnerProps {
  bgColor?: string
  textColor?: string
  spinnerColor?: string
}

const LoadingSpinner = (props: ILoadingSpinnerProps) => {
  const language = useSettingsStore((s) => s.language)
  const height = useClientStore((s) => s.height)
  const width = useClientStore((s) => s.width)

  const size = Math.min(width, height) / 3

  return (
    <div className="loading-spinner" style={{ backgroundColor: props.bgColor }}>
      <ImSpinner9
        style={{
          top: `${(height - size) / 2}px`,
          left: `${(width - size) / 2}px`,
          color: `${props.spinnerColor}`
        }}
        size={size}
      />
      <h2
        style={{
          width: size,
          top: `${(height + size) / 2}px`,
          left: `${(width - size) / 2}px`,
          color: `${props.textColor}`
        }}
      >
        {strings[language].misc.loading}
      </h2>
    </div>
  )
}

export default LoadingSpinner
