const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/userModel');
const protectRoutes = require('./authHelpers')
// const userRouter  = require('./Routers/userRouters')
const { getAllUser, getUser, updateUser, deleteUser } = require('../controller/userController');

const {signup,login,isAuthorised,protectedRoutes} = require('../controller/authController')
//user Options

userRouter.route('/:id').patch(updateUser).delete(deleteUser)


userRouter.route('/signup').post(signup)
userRouter.route('/login').post(login)



// profilePage

userRouter.use(protectedRoutes)
userRouter.route('/userProfile').get(getUser)

// admin specific function
userRouter.use(isAuthorised(['admin']));
userRouter.route('/').get(getAllUser)
// app.use('/user', userRouter);
// userRouter.route('/').get(protectRoutes, getUsers).post(postUser).patch(updateUser).delete(deleteUser) // Path Specific MiddleWare

// userRouter.route('/getCookies').get(getCookies)
// userRouter.route('/setCookies').get(setCookies)

// userRouter.route('/:id').get(getUserById);
// params
// app.get('/user/:id', (req, res) => {
//     let id = req.params.id;
//     res.send(users[id - 1]);
// })

// app.post('/user', (req, res) => {

//     // if method is post then you must send response
//     console.log(req.body);
//     users = req.body;
//     res.send(users);
//     res.json({
//         message: "OK",
//         users: req.body
//     })
// })


// update ---> PATCH
// app.patch('/user', (req, res) => {
//     console.log("req body data", req.body);
//     //update data in users in obj
//     let dataToBeUpdated = req.body;
//     for (let key in dataToBeUpdated) {
//         users[key] = dataToBeUpdated[key];
//     }

//     res.json({
//         message: "OK Data updated Successfully",


//     })
// })


// To DELETE a data
// app.delete('/user', (req, res) => {
//     users = {}
//     res.json({
//         message: "Data has been Deleted"
//     })
// })





module.exports = userRouter;