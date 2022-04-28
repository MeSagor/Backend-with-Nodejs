const express = require('express')
const router = express.Router();
router.use(express.json())
const Leaders = require('../models/leaderSchema')
const {authCheker} = require('./userAuth')


router.get('/', (req, res) => {
    Leaders.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get('/:id', (req, res) => {
    Leaders.find({_id: req.params.id})
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

router.post('/', authCheker, (req, res) => {
    if (req.admin) {
        const leader = new Leaders(req.body)
        leader.save()
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
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
        Leaders.updateOne({_id: req.params.id}, req.body)
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
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
        Leaders.deleteOne({_id: req.params.id})
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
                console.log(err)
            })
    } else {
        res.json({
            message: "You aren't an admin and you have no permission...",
        })
    }
})

module.exports = router