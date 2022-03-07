const express = require('express')
const app = express()
const dishesRouter = require('./routes/dishes')
const promotionsRouter = require('./routes/promotions')
const leadersRouter = require('./routes/leaders')

app.get('/', (req, res) => {
    res.send("We are at HOME")
})
app.use('/dishes', dishesRouter)
app.use('/promotions', promotionsRouter)
app.use('/leaders', leadersRouter)

app.listen(3000, () => {
    console.log('Listening on port 3000... ')
})

