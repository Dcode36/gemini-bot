import React from 'react'
import LandingPage from './components/LandingPage'
import './App.css';
import GeminiBot from './components/GeminiBot'
import AOS from 'aos';
import 'aos/dist/aos.css';
const App = () => {
  AOS.init();
  return (
    <div>
      <LandingPage/>
      <GeminiBot/>
    </div>
  )
}

export default App
