import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginWithGoogle from './components/LoginWithGoogle'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Navbar from './components/Navbar'
import CreateCustomer from './components/CreateCustomer'
import ComposePage from './Pages/ComposePage'


function App() {


  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new/business" element={<CreateCustomer />} />
          <Route path="/new/email" element={<ComposePage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
