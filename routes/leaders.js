const express = require('express')
const Joi = require('joi')
const router = express.Router();
router.use(express.json())

const leaders = [
    {id: 1, name: 'Akif'},
    {id: 2, name: 'Opi'},
    {id: 3, name: 'Sagor'},
    {id: 4, name: 'Pranto'},
    {id: 5, name: 'raju'},
    {id: 6, name: 'Thohid'},
    {id: 7, name: 'Hemel'}
]

router.get('/', (req, res) => {
    res.send(leaders)
})
router.get('/:id', (req, res) => {
    const leader = leaders.find(d => d.id === parseInt(req.params.id))
    if (!leader) res.status(404).send('The Leader with given id was not found..!')
    else res.send(leader)
})
router.post('/', (req, res) => {

    const result = validateDish(req.body)
    // console.log(result)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    const leader = {
        id: leaders.length + 1,
        name: req.body.name
    }
    leaders.push(leader)
    res.send(leader)
})
router.put('/:id', (req, res) => {
    const leader = leaders.find(d => d.id === parseInt(req.params.id))
    if (!leader) {
        res.status(404).send('The Leader with given id was not found..!')
        return
    }

    const result = validateDish(req.body)
    // console.log(result)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    leader.name = req.body.name
    res.send(leader)

})
router.delete('/:id', (req, res) => {
    const leader = leaders.find(d => d.id === parseInt(req.params.id))
    if (!leader) {
        res.status(404).send('The Leader with given id was not found..!')
        return
    }

    const index = leaders.indexOf(leader)
    leaders.splice(index, 1)

    res.send(leader)

})

function validateDish(leader) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(leader)
}

module.exports = router