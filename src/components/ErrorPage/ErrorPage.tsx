import { FcUndo } from 'react-icons/fc'
import { FiSettings } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { useSettingsStore } from '@/store/Settings'

import { strings } from '../../util/language'
import FloatingButton from '../Shared/FloatingButton/FloatingButton'
import './ErrorPage.css'

const IMAGE = '/images/220108backgroundlama.png'

const ErrorPage = () => {
  const language = useSettingsStore((s) => s.language)

  const style = {
    backgroundImage: `url(${IMAGE})`
  }

  return (
    <div className="loginBackground flex" style={style}>
      <h1 className="error-page-title">{strings[language].errorPage.notFound}</h1>

      <Link to="/">
        <FloatingButton
          icon={<FcUndo size={30} className="floating-button-icon" />}
          style={{ top: '10px', left: '10px' }}
        />
      </Link>
      <Link to="/settings">
        <FloatingButton
          icon={<FiSettings size={30} className="floating-button-icon" />}
          style={{ top: '10px', right: '10px' }}
        />
      </Link>
    </div>
  )
}

export default ErrorPage
