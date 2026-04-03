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

  const cleanName = name?.trim() // "?" prevent cash if undefined
  const cleanEmail = email?.trim()

  if (!cleanName || !cleanEmail || !date || !time) { // check empty fields
    return res.status(400).json({
      error: 'All fields are required'
    })
  }

  if (cleanName.length > 100) {
    return res.status(400).json({ error: 'Name too long' })
  }

  const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if (!emailRegex.test(cleanEmail)) {
    return res.status(400).json({
      error: 'Invalid email format'
    })
  }


  const dateRegex = /^\d{4}-\d{2}-\d{2}$/

  if (!dateRegex.test(date)) {
    return res.status(400).json({ error: 'Invalid format' })
  }

  const [year, month, day] = date.split('-').map(Number)
  const parsedDate = new Date(date)

  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() + 1 !== month ||
    parsedDate.getDate() !== day
  ) {
    return res.status(400).json({ error: 'Invalid date' })
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

    db.query(insertSql, [cleanName, cleanEmail, date, time], (err) => {
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