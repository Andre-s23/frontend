import { useState } from 'react'

import './App.css'

function App() {
  const [text, setText] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [extraText, setExtraText] = useState('')
  const [fetchedData, setFetchedData] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!text.trim()) {
      setStatus('Введите текст')
      return
    }

    setLoading(true)
    setStatus('')
    setFetchedData('')

    try {
      const response = await fetch('/api/submit', {
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
const handleFetchData = async () => {
    setLoading(true)
    setStatus('')

    try {
      const response = await fetch('/api/data')
      const data = await response.json()

      if (response.ok) {
        setFetchedData(data.content)
      } else {
        setFetchedData(`Ошибка: ${data.error}`)
      }
    } catch (error) {
      setFetchedData(`Ошибка: ${error.message}`)
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

        <button type="submit"  className="button primary">
            Отправить
        </button>
      </form>

      {status && <p className="status">{status}</p>}

      <div className="fetch-section">
        <button onClick={handleFetchData}  className="button secondary">
            Получить
        </button>

        {fetchedData && (
          <div className="result-box">
            <h3>Результат из data.txt:</h3>
            <pre>{fetchedData}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
