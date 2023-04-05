import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './global.scss'
import LoginWithGoogle from './components/LoginWithGoogle'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Navbar from './components/Navbar'
import CreateCustomer from './components/CreateCustomer'
import ComposePage from './Pages/ComposePage'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import LoginPage from './Pages/LoginPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchPage from './Pages/SearchPage'
import NavbarGPT from './components/NavBarGPT'
import LoginChecker from './components/LoginChecker'


function App() {




  return (
    <div className="App">
      <Router>
        <NavbarGPT />
        <LoginChecker>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/new/business" element={<CreateCustomer />} />
            <Route path="/new/email" element={<ComposePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </LoginChecker>
      </Router>
    </div >
  )
}

export default App
