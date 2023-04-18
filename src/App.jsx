import React from 'react'
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EditorPage from './pages/EditorPage';
import Home from './pages/Home';

const App = () => {
  return (
    <>

    <Toaster position='top-center' >
    </Toaster>

    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/editor/:roomId' element={<EditorPage />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App