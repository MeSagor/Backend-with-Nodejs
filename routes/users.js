const express = require('express')
const router = express.Router();
router.use(express.json())
const Users = require('../models/userSchema')
const {signupAuth, signinAuth, authCheker} = require('./userAuth')


router.get('/', authCheker, (req, res) => {
    if(req.admin){
    Users.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.status(404)
            console.log(err)
        })
    }else {
        res.json({
            message: "Only admin can see users...",
        })
    }

})


router.post('/signup', signupAuth, (req, res) => {
    const user = new Users({
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    })

    user.save()
        .then((result) => {
            res.json({
                message: 'User created successfully',
                result
            })
        })
        .catch((err) => {
            res.json({
                message: 'User not created',
                err
            })
        })
})

router.post('/signin', signinAuth, (req, res) => {
    res.json({
        "message": "Login Successful",
        "access_token": req.body.token
    })
})


module.exports = router