import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
//import passwordComplexity from 'joi-password-complexity'
import joi from 'joi'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign( {_id: this._id}, process.env.JWTPRIVATEKEY, {expireIn: "7d"} )
    return token
}

export const User = mongoose.model("user", userSchema)

export const validatorRegister = (data) => {
    const schema = joi.object({
       name: joi.string().required().label("name"),
       email: joi.string().email().required().label("email"),
       password: joi().required().label("password")
    })

    return schema.validate(data)
}

export const validateAuth = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("password"),
        password: joi().required().label("password")
    })
    return schema.validate(data)
}


