const express = require('express')
const app = express()
const { PORT = 5000, NODE_ENV = 'development' } = process.env

if (NODE_ENV !== 'production') require('dotenv').load()

app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

app.get('/ping', (req, res, next) => {
  res.send('PONG')
})

const listener = () => console.log(`Listening on port ${PORT}!`)
app.listen(PORT, listener)
