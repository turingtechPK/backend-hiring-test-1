const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

// eslint-disable-next-line no-unused-vars

const routes = require('./routes')
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8000

app.use(cors('*'))

app.use(express.json()) //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })) //Parse URL-encoded bodies
app.use(morgan('combined'))
app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})
