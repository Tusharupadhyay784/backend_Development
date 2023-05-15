const express = require('express');
// const authRouter = express.Router();
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')
const JWT_KEY = 'sdfasdfsadfsdaf'
// signIn User
module.exports.signup = async function signup(req, res) {
    try {
        let data = req.body;
        let user = await userModel.create(data);
        if (user) {
            res.json({
                message: "User signed up successfuully",
                user: user
            })
        }
        else {
            res.json({
                message: "Error While signing In"
            })
        }
    }

    catch (e) {
        res.status(500).json({
            message: e.message,
            user: null
        })
    }
}
//logIn User
module.exports.login = async function loginUser(req, res) {
    console.log("Login is working....");
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });
        // const user = await userModel.login(email, password);
        // console.log(user);
        if (user) {
            // bcrypt---> compare
            if (user.password === password) {
                // res.cookie('isLoggedIn', true);
                let payload = user; //uid
                let tokenjwt = jwt.sign({ payload }, JWT_KEY)
                // res.setCookie('isLoggedIn', tokenjwt);
                res.cookie('Islogged',tokenjwt)

                return res.json({
                    message: "User has logged in",
                    userDetails: req.body
                })
            } else {
                return res.json({
                    message: "Wrong Credentials"
                })
            }
            // req.session.user = user;
            // res.json({
            //     message: "OK",
            //     user: user

            // })

        }
        else {
            res.json({
                message: "Wrong email or password",
                user: null
            })
        }
    }
    catch (e) {
        return res.json({
            message: e.message,
            status: 500,
            user: null

        })
    }


}

//isAuthorised--> To Check the user's role[admin,user,owner,restrauent]
module.exports.isAuthorised = function isAuthorised(roles) {
    return function (req, res, next) {
        if (roles.include(req.role) === true) {
            next();
        }
        else {
            res.status(401).json({
                message: "Operation Not Allowed"
            })
        }
    }
}

//protectRoute
module.exports.protectedRoutes = async function protectRoutes(req, res, next) {
    console.log(req.cookies.Islogged);
    try {
        let token
        
        if (req.cookies.Islogged) {
            token = req.cookies.login
            let payload = jwt.verify(token, JWT_KEY)
            if (payload) {
                console.log("1", payload);
                const user = await userModel.findById(payload.payload)

                req.role = user.role
                req.id = user.id;
                console.log(req.role)
                console.log(req.id)
                next();
            }
            else {
                return res.json({
                    message: "Login Again"
                })
            }
            // next();
        }
        else {
            res.json({
                message: "Please Login"
            })
        }
    }
    catch (e) {
        return res.json({
            message: e.message
        })
    }
}