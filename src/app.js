if (process.env.USER) require('dotenv').config()
const express = require('express')
const app = express()

const moviesRouter = require('./movies/movies.router')
const notFound = require('../src/errors/notFound')
const errorHandler = require('../src/errors/errorHandler')

app.use(express.json())

app.use('/movies', moviesRouter)

app.use(notFound)
app.use(errorHandler)

module.exports = app
