import 'dotenv/config'
import db from './config/db.js'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API running')
})

app.post('/bookings', (req, res) => {
  const { name, email, date, time } = req.body

  const checkSql = `
    SELECT * FROM bookings WHERE date = ? AND time = ?
  `

  db.query(checkSql, [date, time], (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' })

    if (results.length > 0) {
      return res.status(400).json({ error: 'Time slot already booked' })
    }

    const insertSql = `
      INSERT INTO bookings (name, email, date, time)
      VALUES (?, ?, ?, ?)
    `

    db.query(insertSql, [name, email, date, time], (err) => {
      if (err) return res.status(500).json({ error: 'DB error' })

      res.json({ message: 'Booking confirmed' })
    })
  })
})

app.get('/bookings', (req, res) => {
  db.query('SELECT * FROM bookings', (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' })
    res.json(results)
  })
})

app.get('/test-db', (req, res) => {
  db.query('SELECT 1', (err) => {
    if (err) return res.send('DB error')
    res.send('DB working')
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})