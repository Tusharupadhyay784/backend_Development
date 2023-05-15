const mongoose = require('mongoose')
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt')

mongoose.connect('mongodb+srv://Hari:1234567890@cluster0.kemswzp.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log("Connected To DB")
}).catch(() => {
    console.log("Error Connecting To DB")
})


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,

        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: function () {
                return emailValidator.validate(this.email);
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        confirmPassword: {
            type: String,
            required: true,
            minlength: 6,
            validate: function () {
                return this.confirmPassword === this.password;
            }

        },

        role: {
            type: String,
            enum: ['admin', 'user', 'restraurantowner', 'deliveryboy'],
            default: 'user'
        },

        profileImage: {
            type: String,
            default: 'img/users/default.jpeg'
        }
    },


)
// hooks ---> before saving data into database we are going to do some of the things which will effect our database
// userSchema.pre('save', function () {
//     console.log("Before saving into DB", this);
// })
// First all Pre hooks run first then after post hooks run after
// userSchema.post('save', function (doc) {
//     // doc is a thing where we get what is in our database
//     console.log("After saving into DB", doc);
// })
// userSchema.delete ----> Explore on my Own

userSchema.pre('save', function () {
    // before saving into the database we are making the confirm password undefined so that it will not be save into our DB
    this.confirmPassword = undefined;
})

// making the password into salt or encrypted
// userSchema.pre('save', function () {
//     let salt = bcrypt.genSalt();
//     let hash = bcrypt.hashSync(this.password, 10);
//     this.password = hash;

// })

// Models
const userModel = mongoose.model("User", userSchema, "users");
module.exports = userModel;

//inside the database the name of the DB is users
