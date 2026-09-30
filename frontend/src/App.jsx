import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import Home from './pages/Home.jsx'
import UploadPage from './pages/UploadPage.jsx'

function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>

        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/upload" element={<UploadPage/>} />
        </Route>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
