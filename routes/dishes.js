const express = require('express')
const router = express.Router();
router.use(express.json())
const Dishes = require('../models/dishesSchema')
const {userAuth, adminAuth, userAuthDelete, authCheker} = require('./userAuth')


router.get('/', (req, res) => {
    Dishes.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.status(404)
            console.log(err)
        })
})

router.get('/:id', (req, res) => {
    Dishes.find({_id: req.params.id})
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.status(404)
            console.log(err)
        })
})

router.get('/:id/comments', (req, res) => {
    Dishes.find({_id: req.params.id})
        .then((result) => {
            res.json({
                dish: result[0].name,
                comments: result[0].comments
            })
        })
        .catch((err) => {
            res.status(404)
            console.log(err)
        })
})


router.post('/:id/comments', authCheker, (req, res) => {
    Dishes.find({_id: req.params.id})
        .then((result) => {
            const newComments = result[0].comments
            newComments.push({
                email: req.email,
                body: req.body.body
            })

            Dishes.updateOne({_id: req.params.id}, {
                name: result[0].name,
                price: result[0].price,
                comments: newComments
            }).then((done) => {
                res.json({
                    message: 'Comment Added',
                    done
                })
            }).catch((err) => {
                res.json({
                    message: 'Comment not Added',
                    err
                })
            })
        })
        .catch((err) => {
            res.json({
                message: 'Dish not found',
                err
            })
        })
})

router.delete('/:id/comments', authCheker, (req, res) => {
    Dishes.find({_id: req.params.id})
        .then((result) => {
            let findComment = false;
            result[0].comments.every((eachComment, index) => {
                if (req.email === eachComment.email) {
                    findComment = true
                    result[0].comments.splice(index, 1)
                    return false
                }
                return true
            })
            if (findComment) {
                Dishes.updateOne({_id: req.params.id}, result[0])
                    .then((done) => {
                        res.json({
                            message: "Successfully deleted your comment",
                            done
                        })
                    }).catch((err) => {
                    res.json({
                        message: "err occurred",
                        err
                    })
                })
            }
            if (!findComment) {
                res.json({
                    message: "You don't yet comment on this dish. You can't delete any comment"
                })
            }
        })
        .catch((err) => {
            res.status(404)
            console.log(err)
        })
})


router.post('/', authCheker, (req, res) => {
    if (req.admin) {
        const dish = new Dishes(req.body)
        dish.save()
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
                res.status(404)
                console.log(err)
            })
    } else {
        res.json({
            message: "You aren't an admin and you have no permission to post..!"
        })
    }
})

router.put('/:id', authCheker, (req, res) => {
    if (req.admin) {
        Dishes.updateOne({_id: req.params.id}, req.body)
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
                res.status(404)
                console.log(err)
            })
    } else {
        res.json({
            message: "You aren't an admin and you have no permission to update..!"
        })
    }
})

router.delete('/:id', authCheker, (req, res) => {

    if (req.admin) {
        Dishes.deleteOne({_id: req.params.id})
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
                res.status(404)
                console.log(err)
            })
    } else {
        res.json({
            message: "You aren't an admin and you have no permission to delete..!",
        })
    }
})

module.exports = router