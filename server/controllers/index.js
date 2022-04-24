import express from 'express'
import { User, validateAuth, validatorRegister } from '../models/User.js'
const router = express.Router()
import bcrypt from 'bcrypt'

export const register = async (req,res) => {
    const {name,email,password} = req.body

    try {
        const {error} = validatorRegister(req.body)
        if(error) {
            res.status(400).send({"message": error.details[0].message })
        }
 
        const user = await User.findOne({email})
        if(user) {
            res.status(409).send({"message": "user with given email already exit" })
        }
 
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash( password, salt )       
 
        const newUser = new User({
            name,
            email,
            password: hashPassword,
        })
        await newUser.save()
        res.status(201).send({"message": "user created successfully!" })
 
    } catch (error) {
        res.status(500).json("internal server error")
    }
}


export const login = async (req,res) => {
   const {password,email} = req.body
    try {
      
      const {error} = validateAuth(req.body)
      if(error) {
          res.status(400).send({"message": error.details[0].message})
      }
      
      const user = await User.findOne({email})
      if(!user) {
        res.status(401).send({"message": "invalid credentials" })
      }

      const validPassword = bcrypt.compare( 
          password,
          user.password
      )
      if(!validPassword) {
         res.status(401).send({"message": "invalid credentials" })
      }

      const token = user.generateAuthToken()

      res.status(200).send({token,"message": "logged in successfully" })

   } catch (error) {
       res.status(500).send({"message": "internal server error!" })
   }
}


