import express from 'express'
import CONNECTDB from './DB/db.js'
import cors from 'cors'
const app = express()
import router from './routers/User.js'
import dotenv from "dotenv"
dotenv.config()


// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use( "/", router )

// connect to database
CONNECTDB()

app.get( "/", (req,res) => {
    res.send("home page")
} )

const port = process.env.PORT || 5000

app.listen( port, () => console.log(`server is running on http://localhost:${port}`) )


