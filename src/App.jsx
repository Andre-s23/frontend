import { useState } from 'react'

import './App.css'

function App() {
  const [text, setText] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!text.trim()) {
      setStatus('Введите текст')
      return
    }

    setLoading(true)
    setStatus('')

    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text })
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('Данные успешно отправлены!')
        setText('')
      } else {
        setStatus(`Ошибка: ${data.error}`)
      }
    } catch (error) {
      setStatus(`Ошибка соединения: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Отправка данных на сервер</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите текст..."
          disabled={loading}
          className="input"
        />
        <button type="submit" disabled={loading} className="button">
          {loading ? 'Отправка...' : 'Отправить'}
        </button>
      </form>

      {status && <p className="status">{status}</p>}
    </div>
  )
}

export default App
