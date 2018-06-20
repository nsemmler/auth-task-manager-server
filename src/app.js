const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

app.get('/ping', (req, res, next) => {
  res.send('PONG')
})

const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)
