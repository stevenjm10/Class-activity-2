import { useNavigate } from 'react-router-dom'

export default function Menu({ user, onLogout }) {
  const navigate = useNavigate()

  const signOut = () => {
    onLogout()
    navigate('/')
  }

  return (
    <div className="page">
      <div className="box">
        <h1>Hello, {user}</h1>
        <p>Choose an app:</p>
        <button onClick={() => navigate('/sum')}>SUM</button>
        <button onClick={() => navigate('/calculator')}>Calculator</button>
        <button onClick={() => navigate('/form')}>Form</button>
        <button className="light-button" onClick={signOut}>Sign out</button>
      </div>
    </div>
  )
}
