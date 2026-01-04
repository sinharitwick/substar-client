import { BrowserRouter } from 'react-router'
import './App.css'
import SubstarUserInterface from './pages/SubstarUserInterface'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <BrowserRouter>
      <SubstarUserInterface />
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
