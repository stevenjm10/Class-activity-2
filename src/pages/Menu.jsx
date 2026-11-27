export default function Menu({ user, onOpen, onLogout }) {
  return (
    <div className="page">
      <div className="box">
        <h1>Hello, {user}</h1>
        <p>Choose an app:</p>
        <button onClick={() => onOpen('sum')}>SUM</button>
        <button onClick={() => onOpen('calculator')}>Calculator</button>
        <button onClick={() => onOpen('form')}>Form</button>
        <button onClick={() => onOpen('characters')}>Rick and Morty</button>
        <button className="light-button" onClick={onLogout}>Sign out</button>
      </div>
    </div>
  )
}
