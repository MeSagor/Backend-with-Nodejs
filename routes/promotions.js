const express = require('express')
const router = express.Router();
router.use(express.json())
const Promotions = require('../models/promotionsSchema')
const {authCheker} = require('./userAuth')


router.get('/', (req, res) => {
    Promotions.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.status(404)
            console.log(err)
        })
})

router.get('/:id', (req, res) => {
    Promotions.find({_id: req.params.id})
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.status(404)
            console.log(err)
        })
})

router.post('/', authCheker, (req, res) => {
    if (req.admin) {
        const promotion = new Promotions(req.body)
        promotion.save()
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
                res.status(404)
                console.log(err)
            })
    } else {
        res.json({
            message: "You aren't an admin and you have no permission...",
        })
    }
})

router.put('/:id', (req, res) => {
    if (req.admin) {
        Promotions.updateOne({_id: req.params.id}, req.body)
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
                res.status(404)
                console.log(err)
            })
    } else {
        res.json({
            message: "You aren't an admin and you have no permission...",
        })
    }
})

router.delete('/:id', (req, res) => {
    if (req.admin) {
        Promotions.deleteOne({_id: req.params.id})
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
                res.status(404)
                console.log(err)
            })
    } else {
        res.json({
            message: "You aren't an admin and you have no permission...",
        })
    }
})

module.exports = router