import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NamesProvider } from "./context/NamesProvider.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NamesProvider>
  <App />
</NamesProvider>
  </StrictMode>,
)
