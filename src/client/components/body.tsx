import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './home'

export const render = () => (
  <div className="body-wrapper">
    <div className="body">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  </div>
)

export default render
