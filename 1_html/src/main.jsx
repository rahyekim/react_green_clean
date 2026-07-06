import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//부트스트랩을 전역 사용하려면 ... 여기 main.jsx에 cdn선언해야함
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import App from './App.jsx'
import './scss/style.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
