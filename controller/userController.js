const userModel = require("../models/userModel");


// functions below
module.exports.getUser = async function getUser(req, res) {
    // res.send(users);
    let id = req.params.id;
    let allUsers = await userModel.findById({ id }); // it find all the DB
    // let allUsers = await userModel.findOne({ name: "Xmen2" }); // it finds single DB
    if (allUsers) {
        res.json({
            message: "OK Find it",
            data: allUsers
        })
    }
    else {
        res.json({
            message: "Users Not Found",
            data: null
        })
    }
}
module.exports.postUser = function postUser(req, res) {
    console.log(req.body);
    users = req.body;
    res.json({
        message: "Data Recieved Success",
        users: req.body
    })
}
module.exports.updateUser = async function updateUser(req, res) {
    // console.log("req body data", req.body);
    //update data in users in obj
    try {


        let id = req.params.id;
        let dataToBeUpdated = req.body;
        let user = await userModel.findByIdAndUpdate(id);
        if (user) {
            const keys = [];
            for (let key in dataToBeUpdated) {
                keys.push(key);
            }
            for (let i = 0; i < keys.length; i++) {
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            const updatedData = await user.save();
            res.json({
                message: "OK Data updated Successfully",
                data: user


            })
        }
        else {
            res.json({
                message: "Users Not Found",
                data: null
            })
        }
    }
    catch (e) {
        res.json({
            message: e.message
        })
    }
    // for (let key in dataToBeUpdated) {
    //     users[key] = dataToBeUpdated[key];
    // }


}

module.exports.deleteUser = async function deleteUser(req, res) {
    // users = {};
    try {


        let id = req.params.id;
        let datatobeDeleted = req.body;
        let user = await userModel.findByIdAndDelete(id);
        if (!user) {
            res.json({
                message: "user not found"
            })
        }
        res.json({
            message: "OK Data is deleted",
            data: user

        })
    }
    catch (e) {
        res.json({
            message: e.message
        })
    }
}
module.exports.getAllUser = async function getAllUser(req, res) {
    // let id = req.params.id;
    // res.send(users[id - 1]);
    let users = await userModel.find();
    if (users) {
        res.json({
            message: "user retrieved",
            data: users
        })
    }
    else {
        res.json({
            message: "no user found"
        })
    }

}

module.exports.setCookies = function setCookies(req, res) {
    // res.setHeader('Set-Cookie', 'isLoggedIn=true')
    res.cookie('isLoggedIn', true, { maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly: true }); // coming from package
    res.cookie('isPrimeMember', true); // coming from package
    res.send('cookies has been set');
}
module.exports.getCookies = function getCookies(req, res) {
    let cookies = req.cookies;
    console.log(cookies);
    res.send("Cookie Recieved");
}
// let flag = true; // user logged In this thing we will get from if user is logged in or not