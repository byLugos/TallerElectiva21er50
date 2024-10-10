const express = require('express')
const cors = require('cors')

require('dotenv').config()
require('./drivers/connect-db')

const app = express()

const PORT = process.env.PORT || 3000

const swaggerUI = require('swagger-ui-express')
const swaggerSpec = require('./swagger')

app.use(express.json())
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.use(cors())

app.use('/owners', require('./routes/owner'))
app.use('/pets', require('./routes/pets'))
app.use('/api/' ,require('./routes/login'))

app.listen(PORT, ()=> console.log(`Server Ready At Port = ${PORT}`))
