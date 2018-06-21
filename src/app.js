const express = require('express')
const app = express()
const { PORT = 5000, NODE_ENV = 'development' } = process.env

if (NODE_ENV !== 'production') require('dotenv').load()

app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

app.use('/api/users', require('./routes/users'))
app.use('/api/lists', require('./routes/lists'))
app.use('/api/tasks', require('./routes/tasks'))

const listener = () => console.log(`Listening on port ${PORT}!`)
app.listen(PORT, listener)
