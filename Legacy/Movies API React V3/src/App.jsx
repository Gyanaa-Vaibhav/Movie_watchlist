import { useState } from 'react'
import Everything from './components/Everything.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Everything />
    </div>
  )
}

export default App
