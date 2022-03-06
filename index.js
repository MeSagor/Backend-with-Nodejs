const express = require('express')
const app = express()
const useRouter = require('./routes/dishes')

app.use('/', useRouter)

app.listen(3000, () => {
    console.log('Listening on port 3000... ')
})

