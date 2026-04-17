const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const userRouter = require('./presentation/routes/userRoute');   // ← Make sure path is correct

const app = express();

dotenv.config();

app.use(express.json())
const port=process.env.PORT

const corsOptions = {
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
};

app.use(cors(corsOptions))
mongoose.connect(process.env.MONGODB_URI).then((data)=>
{
    console.log("mongodb connected");
    
}).catch((err)=>{
    console.log("Erron in monggodb connection",err);
    
})
app.use('/',userRouter)

app.listen(port,()=>{
    console.log(`servers is connected and running on port ${port}`);
    
})