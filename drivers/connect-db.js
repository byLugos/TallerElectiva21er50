const mongoose = require('mongoose')

const URI = process.env.MONGODB_URI
mongoose.set('strictQuery', false)

mongoose.connect(URI)
    .then(()=> console.log('Connect DB Success'))
    .catch(err => console.error('Connect DB Fail '+ err))

module.exports = mongoose