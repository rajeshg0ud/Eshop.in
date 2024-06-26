import mongoose from 'mongoose'

 const connectToDB= async()=>{
    try{
        const db= await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongo connected ${db.connection.host}`)
    }
    catch(err){
        console.log(err)
    }
}

export default connectToDB;