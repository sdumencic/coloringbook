import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import './App.css'
import ErrorPage from './components/ErrorPage/ErrorPage'
import GamePage from './components/GamePage/GamePage'
import GameSelectPage from './components/GameSelectPage/GameSelectPage'
import HomePage from './components/HomePage/HomePage'
import SettingsPage from './components/SettingsPage/SettingsPage'
import { useActionsStore } from './store/Actions'
import { useClientStore } from './store/Client'
import { debounce } from './util/misc'

const App = () => {
  const { pathname } = useLocation()
  const resize = useClientStore((s) => s.resize)
  const setLocationCount = useActionsStore((s) => s.doSetLocationCount)

  // On window resize, update the dimensions in global state
  useEffect(() => {
    const handleResize = () => {
      resize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', debounce(handleResize, 100))

    return () => window.removeEventListener('resize', debounce(handleResize, 100))
    // We want this to run only on mount and unmount, linter cant detect
    // this use case, so we will disable it :)
    // eslint-disable-next-line
  }, [])

  // Because router v6 does not expose history, we use this hack to track length
  useEffect(() => {
    setLocationCount()
  }, [pathname])

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/game" element={<GameSelectPage />} />
      <Route path="/game/:id" element={<GamePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App
