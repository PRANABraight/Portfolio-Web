import { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Body from './components/Body'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <br />
      <br />
      <Sidebar />
      <Body />
    </>
  )
}

export default App
