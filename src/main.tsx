import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route index element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
