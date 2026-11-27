import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Two-number sum app
export default function Sum() {
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const [result, setResult] = useState('')
  const navigate = useNavigate()

  const add = () => {
    if (num1 === '' || num2 === '') {
      setResult('Enter both numbers')
      return
    }
    setResult(String(Number(num1) + Number(num2)))
  }

  return (
    <div className="page">
      <div className="box">
        <h1>Sum</h1>
        <div className="row">
          <input type="number" placeholder="Number 1" value={num1} onChange={(e) => setNum1(e.target.value)} />
          <input type="number" placeholder="Number 2" value={num2} onChange={(e) => setNum2(e.target.value)} />
        </div>
        <div className="row">
          <input type="text" placeholder="Result" value={result} readOnly />
          <button onClick={add}>Add</button>
        </div>
        <button className="light-button" onClick={() => navigate('/menu')}>← Back to menu</button>
      </div>
    </div>
  )
}
