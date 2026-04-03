import 'dotenv/config'
import db from './config/db.js'
import express from 'express'
import cors from 'cors' // allow Vue to talk to backend

const app = express() // create the server
app.use(cors()) // allow request from frontend (without browser block requests = CORS error)
app.use(express.json()) // lets you read JSON from request

app.get('/', (req, res) => { // test route
  res.send('API running')
})

app.post('/bookings', (req, res) => {
  const { name, email, date, time } = req.body

  if (!name || !email || !date || !time) { // check empty fields
    return res.status(400).json({
      error: 'All fields are required'
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/  // basic email format 

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: 'Invalid email format'
    })
  }
  
  const allowedTimes = ['10:00', '11:00', '14:00', '15:00']  // prevent random values

  if (!allowedTimes.includes(time)) {
    return res.status(400).json({
      error: 'Invalid time slot'
    })
  }


  // prevent double booking
  const checkSql = `
    SELECT * FROM bookings WHERE date = ? AND time = ?
  `

  db.query(checkSql, [date, time], (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' })

    if (results.length > 0) {
      return res.status(400).json({
        error: 'Time slot already booked'
      })
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