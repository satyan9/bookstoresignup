import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors";
import userRoute from "./Router/Uroute.js"

const app = express()
app.use(cors())
app.use(express.json());

dotenv.config()


const PORT = process.env.PORT || 5001;
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;



mongoose.connect(MONGO_URL, {
     dbname: DB_NAME
     
}).then(
    () => {
        console.log('conntected to database');

    }
).catch((err) => { 
    console.log('conntection error '+err);
})

// definging rou te
app.use("/userdata",userRoute)


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
}) 