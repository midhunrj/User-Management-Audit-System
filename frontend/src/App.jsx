import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { UserRoute } from './routes/userRoute'
import { ManagerRoute } from './routes/managerRoute'
import { AdminRoute } from './routes/adminRoute'
import { Route, Routes } from 'react-router-dom'

function App() {


  return (
    <>
      <Routes>

            <Route path="/*" element={<UserRoute />} />
            <Route path="/manager/*" element={<ManagerRoute />} />
            <Route path="/admin/*" element={<AdminRoute />} />

          </Routes>
    </>
  )
}

export default App
