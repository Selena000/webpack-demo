const express = require('express')

const app = express()

app.get('/api/info', (req, res) => {
  res.json({
    name: 'name',
    age: 18
  })
})

app.listen(9000)