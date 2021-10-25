const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')
const app = express()

const users = require('./routes/api/users')
const profiles = require('./routes/api/profiles')
const exercises = require('./routes/api/exercises')
const exerciseSets = require('./routes/api/exerciseSets')

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

// DB config
const db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('- MongoDB Error - ', err))

// Passport middleware
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)

// Use routes
app.use('/api/v1/users', users)
app.use('/api/v1/profiles', profiles)
app.use('/api/v1/exercises', exercises)
app.use('/api/v1/exercises/sets', exerciseSets)

// Serve static assets if in production (Heroku stuff)
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('ts-client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'ts-client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`server running on port ${port}`))