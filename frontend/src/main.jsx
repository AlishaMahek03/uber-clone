import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Userdata from './context/Userdata.jsx'
import CaptainContext from './context/Captaincontext.jsx'
import SocketProvider from './context/SocketContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptainContext>
      <Userdata>
        <SocketProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>  
          </SocketProvider>
        </Userdata>
    </CaptainContext>
      
  </StrictMode>
)
