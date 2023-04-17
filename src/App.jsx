import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EditorPage from './pages/EditorPage';
import Home from './pages/Home';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/editor/:roomId' element={<EditorPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App