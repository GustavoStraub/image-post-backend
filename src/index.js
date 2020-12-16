const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()
const path = require('path')
const app = express()
const cors = require('cors')

mongoose.connect('mongodb+srv://gustavo:123@image.scpfh.mongodb.net/uploads?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
)
app.use(require('./routes'))

app.listen(4000)