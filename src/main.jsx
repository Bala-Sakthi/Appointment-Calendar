import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ToastContainer
        hideProgressBar={true}
        autoClose={2000}
        closeOnClick={true}
        pauseOnHover={false}
      />
       <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
