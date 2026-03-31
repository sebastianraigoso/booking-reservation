USE booking_app;

CREATE TABLE IF NOT EXISTS bookings (  /* avoids errors if run twice */
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  date DATE,
  time VARCHAR(10)
);