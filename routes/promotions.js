const express = require('express')
const router = express.Router();
router.use(express.json())
const Promotions = require('../models/promotionsSchema')


router.get('/', (req, res) => {
    Promotions.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get('/:id', (req, res) => {
    Promotions.find({id: req.params.id})
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

router.post('/', (req, res) => {
    const promotion = new Promotions(req.body)
    promotion.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

router.put('/:id', (req, res) => {

    Promotions.updateOne({id: req.params.id}, req.body)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

router.delete('/:id', (req, res) => {

    Promotions.deleteOne({id: req.params.id})
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router