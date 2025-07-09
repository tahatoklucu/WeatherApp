import './App.css'
import React from 'react'
import Home from './components/Home';
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <div className='main'>
      <ErrorBoundary >
        <Home />
      </ErrorBoundary>
    </div>
  )
}

export default App
