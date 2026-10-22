import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Process from './pages/Process.jsx'

function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>

        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/AboutUs" element={<About/>} />
          <Route path="/Process" element={<Process/>} />
        </Route>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
