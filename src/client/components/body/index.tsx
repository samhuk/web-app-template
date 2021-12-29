import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './nav'

export const render = () => (
  <Router>
    <div className="body-wrapper">
      <div className="body">
        <Nav />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/orders" element={<h1>Orders</h1>} />
        </Routes>
      </div>
    </div>
  </Router>
)

export default render