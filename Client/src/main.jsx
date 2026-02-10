import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Router} from 'react-router-dom'
import { CartProvider } from 'CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <CartProvider>
    <App />
    </CartProvider>
    </BrowserRouter>
)
