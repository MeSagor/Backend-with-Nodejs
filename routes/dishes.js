const express = require('express')
const router = express.Router();
router.use(express.json())
const Dishes = require('../models/dishesSchema')


router.get('/', (req, res) => {
    Dishes.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get('/:id', (req, res) => {
    Dishes.find({id: req.params.id})
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

router.post('/', (req, res) => {
    const dish = new Dishes(req.body)
    dish.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

router.put('/:id', (req, res) => {

    Dishes.updateOne({id: req.params.id}, req.body)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

router.delete('/:id', (req, res) => {

    Dishes.deleteOne({id: req.params.id})
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router