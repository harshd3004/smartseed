import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Process from './pages/Process.jsx'
import SchemaReview  from './components/schema/SchemaReview.jsx'
import GenerationPlan from './components/plan/GenerationPlan.jsx'
import { sampleGenerationPlan } from "./sampleData";

function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>

        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/AboutUs" element={<About/>} />
          <Route path="/Process" element={<Process/>} />
          <Route path="/schema" element={<SchemaReview />} />
          <Route path="/plan" element={<GenerationPlan  plan={sampleGenerationPlan}/>} />
        </Route>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
