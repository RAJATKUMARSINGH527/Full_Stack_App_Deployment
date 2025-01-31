import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter} from 'react-router-dom';
import { Provider } from "@/components/ui/provider"

createRoot(document.getElementById('root')).render(
  <Provider>
    <createBrowserRouter>
        <App />
    </createBrowserRouter>
  </Provider>

)
