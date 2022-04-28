const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const dishesRouter = require('./routes/dishes')
const promotionsRouter = require('./routes/promotions')
const leadersRouter = require('./routes/leaders')
const usersRouter = require('./routes/users')


mongoose.connect(process.env.DB_URL).then((result) => {
    console.log('Connected to the Database Successfully')
    app.listen(3000, () => {
        console.log('Listening on port 3000... ')
    })
}).catch((err) => {
    console.log(err)
})


app.get('/', (req, res) => {
    res.send("<h1>Welcome to Gorib's Shop</h1>")
})
app.use('/dishes', dishesRouter)
app.use('/promotions', promotionsRouter)
app.use('/leaders', leadersRouter)
app.use('/users', usersRouter)


