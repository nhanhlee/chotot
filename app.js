const express = require('express')
const app = express()
const path = require('path')
require('./db_connection');
require('dotenv').config()
const bodyParser = require('body-parser')
const indexRouter = require('./routers/index')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public')))
app.use('/', indexRouter )

app.listen(3000)
