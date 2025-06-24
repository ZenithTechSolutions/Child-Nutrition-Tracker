import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './main.css'
import App from './App.jsx'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
