const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')
const JWT_KEY = 'sdfasdfsadfsdaf'
authRouter.route('/signup').get(middleware, m2, middleware, getSignUp).post(postSignUp)
authRouter.route('/login').post(loginUser);
function middleware(req, res, next) {
    console.log("Middleware is working....")
    next();
}
function m2(req, res, next) {
    console.log("M2 is working....");
    next();
}
//auth router

function getSignUp(req, res) {
    res.sendFile(__dirname + '/public/index.html') // same as about file sections
}
async function postSignUp(req, res) {
    const { name, email, password } = req.body;
    const obj = req.body;
    const user = await userModel.create(obj);
    console.log(obj);
    console.log(name);
    res.json({
        message: "OK",
        user: user
    })
}

async function loginUser(req, res) {
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
                let payload = user['_id']; //uid
                let tokenjwt = jwt.sign({ payload: payload }, JWT_KEY)
                res.cookie('isLoggedIn', tokenjwt);

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
module.exports = authRouter;