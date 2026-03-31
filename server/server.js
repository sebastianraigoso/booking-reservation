import db from './config/db.js';
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
  const booking = req.body // server receive the data
  bookings.push(booking)

  res.json({ // server responds
    message: 'Booking created',
    booking
  })
})

app.get('/bookings', (req, res) => {
  res.json(bookings)
})

app.get('/test-db', (req, res) => {  // test route for database
  db.query('SELECT 1', (err, result) => {
    if (err) {
      res.send('DB error');
    } else {
      res.send('DB working');
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})