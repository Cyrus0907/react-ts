import { useState } from 'react'

import './App.css'
import Button from './components/Button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-2xl font-bold">Demo Button</h1>

      {/* Nút đổi màu khi click */}
      <Button text="Bấm để đổi màu" />

      
      

      {/* Nút vừa đổi màu vừa tăng counter */}
      <Button
        text={`Count: ${count}`}
        onClick={() => setCount(count + 1)} // truyền vào
        color="#34d399"
        className="font-semibold"
      />
    </div>
      

    </>
  )
}

export default App
