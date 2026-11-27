import { useState } from 'react'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const signIn = (e) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      setError('Enter your username and password')
      return
    }
    onLogin(username.trim())
  }

  return (
    <div className="page">
      <form className="box" onSubmit={signIn}>
        <h1>Sign in</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign in</button>
      </form>
    </div>
  )
}
