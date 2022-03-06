const express = require('express')
const Joi = require('joi')
const router = express.Router();
router.use(express.json())

const dishes = [
    {id: 1, name: 'Barger'},
    {id: 2, name: 'Grill'},
    {id: 3, name: 'Kala-vhuna'}
]

router.get('/', (req, res) => {
    res.send('Hello. we are in Home')
})
router.get('/dishes', (req, res) => {
    res.send(dishes)
})
router.get('/dishes/:id', (req, res) => {
    const dish = dishes.find(d => d.id === parseInt(req.params.id))
    if (!dish) res.status(404).send('The Dish with given id was not found..!')
    else res.send(dish)
})
router.post('/dishes', (req, res) => {

    const result = validateDish(req.body)
    // console.log(result)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    const dish = {
        id: dishes.length + 1,
        name: req.body.name
    }
    dishes.push(dish)
    res.send(dish)
})
router.put('/dishes/:id', (req, res) => {
    const dish = dishes.find(d => d.id === parseInt(req.params.id))
    if (!dish) {
        res.status(404).send('The Dish with given id was not found..!')
        return
    }

    const result = validateDish(req.body)
    // console.log(result)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    dish.name = req.body.name
    res.send(dish)

})
router.delete('/dishes/:id', (req, res) => {
    const dish = dishes.find(d => d.id === parseInt(req.params.id))
    if (!dish) {
        res.status(404).send('The Dish with given id was not found..!')
        return
    }

    const index = dishes.indexOf(dish)
    dishes.splice(index, 1)

    res.send(dish)

})

function validateDish(dish) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(dish)
}

module.exports = router