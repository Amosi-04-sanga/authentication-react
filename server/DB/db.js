import mongoose from 'mongoose'


const CONNECTDB = async () => {
    await mongoose.connect( process.env.MONGO_URI )
    .then( res => {
        console.log("successfully connected to database!")
    })
    .catch( error => {
        console.log(error)
        console.log("could not connect to database!")
    } )
}

export default CONNECTDB


