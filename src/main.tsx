import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './page/App.tsx'
import { BrowserRouter, Link } from 'react-router-dom'
import PageRouter from './routes/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <React.StrictMode>
    <BrowserRouter>
      <nav className="flex justify-center gap-6 bg-gray-100 p-4 shadow">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
        <Link to="/about" className="text-green-600 hover:underline">About</Link>
      </nav>

      <PageRouter />
    </BrowserRouter>
  </React.StrictMode><App />
  </StrictMode>,
)
