const express = require('express');
// const userModel = require('./models/userModel');
// const userRouter  = require('./Routers/userRouters')
const cookieParser = require('cookie-parser') // for setting the cookies
const app = express();

app.use(express.json()); // middleware function ---> whenever the data will come from frontend then convert it into json format this thing will be done by this line this thing only workable in POST
app.use(express.urlencoded({ extended: true })); // this line is for making the node js understand what the data is send through html to js or frontend to backend
app.use(cookieParser()); // this is middleware for writting here is to make every request and response can use it
// app.use(express.cookieParser());
app.listen(100, (err) => {
    console.log("Server is running on ", 100)
})

// frontend or browser always send response to the server or backend
// let users = [
//     {
//         id: 1,
//         name: 'user1',
//     },
//     {
//         id: 2,
//         name: 'user2',
//     },
//     {
//         id: 3,
//         name: 'user3',
//     }
// ]
const userRouter = require('./Routers/userRouters');
const authRouter = require('./Routers/authRouters'); // Global MiddleWare
app.use('/user', userRouter);
app.use('/auth', authRouter);
// app.get('/user',)
// app.get('/user', (req, res) => {
//     // res.send(users)
//     const { name, age } = req.query;
//     res.send({ name, age });
// })

// userRouter.route('/').get(getUsers).post(postUser).patch(updateUser).delete(deleteUser) // Path Specific MiddleWare

// userRouter.route('/getCookies').get(getCookies)
// userRouter.route('/setCookies').get(setCookies)

// userRouter.route('/:id').get(getUserById);








// (async function createUser() {
//     let users = {
//         name: "Xmen2",
//         email: "Xmen2@gmail.com",
//         password: "Xmen1232",
//         confirmPassword: "Xmen1232"
//     }
//     let data = await userModel.create(users);
//     console.log(data);
// })();