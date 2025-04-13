import { useState } from 'react'
import Auth from './components/auth.jsx';
import './App.css'

function App() {
  return (
    <div className="container">
      <h1>React + Redux + Firebase Auth + PWA</h1>
      <Auth />
    </div>
  )
}

export default App
