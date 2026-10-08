import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/baloo-2/700.css'
import '@fontsource/baloo-2/800.css'
import '@fontsource/mukta/400.css'
import '@fontsource/mukta/500.css'
import '@fontsource/mukta/700.css'
import '@fontsource/jetbrains-mono/700.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/type.css'
import App from './App.tsx'
import { launch } from './state/launch.ts'

// The model load and the memory check start here, before any screen renders.
launch()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
