import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

let bookings = [] // fake database act like a fake DB (temporary storage)

app.get('/', (req, res) => {
  res.send('API running')
})

app.post('/bookings', (req, res) => {
  const booking = req.body
  bookings.push(booking)

  res.json({
    message: 'Booking created',
    booking
  })
})

app.get('/bookings', (req, res) => {
  res.json(bookings)
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})