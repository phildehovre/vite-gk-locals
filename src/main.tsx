import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClientProvider } from './util/db'
import ScreenSizeProvider from './contexts/ScreenSizeContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider>
      <ScreenSizeProvider>
        <App />
      </ScreenSizeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
