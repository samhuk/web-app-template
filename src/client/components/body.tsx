import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './nav'
import Home from './home'
import Links from './links'

export const render = () => (
  <Router>
    <div className="body-wrapper">
      <div className="body">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/links" element={<Links />} />
        </Routes>
      </div>
    </div>
  </Router>
)

export default render
