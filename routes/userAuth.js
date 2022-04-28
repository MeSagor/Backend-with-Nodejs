const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const Users = require("../models/userSchema");
const Dishes = require("../models/dishesSchema");

const signupAuth = (req, res, next) => {
    Users.find({email: req.body.email})
        .then((result) => {
            if (result.length > 0) {
                res.json({
                    message: 'Signup Failed. Email Already Exist'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.json({
                            message: 'Hash Failed',
                            err
                        })
                    } else {
                        req.body.password = hash
                        next()
                    }
                })
            }
        })
        .catch((err) => {
            res.json({
                "message": "Error occurs...!"
            })
        })
}


const signinAuth = (req, res, next) => {
    Users.findOne({email: req.body.email})
        .then((user) => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, isvalidPassword) => {
                    if (err) {
                        res.json({
                            "message": "error occurred"
                        })
                    }
                    if (isvalidPassword) {
                        const token = jwt.sign(
                            {email: user.email, id: user._id, admin: user.isAdmin},
                            process.env.JWT_SECRET,
                            {
                                expiresIn: "1h"
                            }
                        )
                        req.body.token = token
                        next()
                    } else {
                        res.json({
                            "message": "Login failed. password does not match....!"
                        })
                    }
                })
            } else {
                res.json({
                    "message": "User not found"
                })
            }
        })
        .catch((err) => {
            res.json({
                "message": "Error occurs...!",
                err
            })
        })
}

const authCheker = (req, res, next) => {
    const {authorization} = req.headers

    try {
        const token = authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const {email, id, admin} = decodedToken
        req.email = email
        req.id = id
        req.admin = admin
        next()
    } catch (err) {
        res.json({
            "message": "token verify...Error occurs...!..you don't have permission",
            err
        })
    }

}


module.exports = {signupAuth, signinAuth, authCheker}