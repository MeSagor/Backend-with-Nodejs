const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dishesRouter = require('./routes/dishes')
const promotionsRouter = require('./routes/promotions')
const leadersRouter = require('./routes/leaders')

// const dbURL = 'mongodb+srv://bangbangshop:bangbangshop@cluster0.rwhnr.mongodb.net/s?retryWrites=true&w=majority'
const dbURL = 'mongodb://127.0.0.1:27017/'

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((result) => {
    console.log('Connected to the Database Successfully')
    app.listen(3000, () => {
        console.log('Listening on port 3000... ')
    })
}).catch((err) => {
    console.log(err)
})


app.get('/', (req, res) => {
    res.send("<h1>We are at Shop Door.Please Enter...</h1>")
})
app.use('/dishes', dishesRouter)
app.use('/promotions', promotionsRouter)
app.use('/leaders', leadersRouter)


