import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Link } from 'react-router-dom'
import PageRouter from './routes/index.tsx'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      {/* <nav className="flex justify-center gap-6 bg-gray-100 p-4 shadow bg-blue">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
        <Link to="/about" className="text-green-600 hover:underline">About</Link>
      </nav> */}

      <PageRouter />
    </BrowserRouter>
  </Provider>
  </StrictMode>,
)
