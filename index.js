const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const path = require('path')
const { send } = require('process')
const port = 3000

const clientpath = path.join(__dirname, './client/dist')
app.use('/', express.static(clientpath))

app.use(express.json())
app.use(cors())

app.use('/api', require('./api/users/router'))
app.use('/api', require('./api/category/router'))
app.use('/api', require('./api/products/router'))
app.use('/api', require('./api/orders/router'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/dist/index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})