import express from 'express' ;
import mongoose from 'mongoose' ;
import morgan from 'morgan' ;
import bodyParser from 'body-parser';
import cors from 'cors' ;
import cookieParser from 'cookie-parser' ;
import dotenv from 'dotenv' ;
import ErrorHandler from './middleware/error.js' ;

dotenv.config({
    path:'./.env'
})

const app = express() ;

// IMPORT ROUTES
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import jobTypeRoutes from './routes/jobTypeRoutes.js';
import jobRoute from './routes/jobsRoutes.js'





// DATABASE CONNECTION
const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log(`MONGODB connected  DB HOST: ${connectionInstance.connection.host}`)
    } catch(error){
        console.log("MONGODB connection error :",error) ;
        process.exit(1) ;
    }
}

// MIDDLEWARE
app.use(morgan('dev')) ;
app.use(bodyParser.json({limit:"5mb"})) ;
app.use(bodyParser.urlencoded({limit:"5mb",extended:true}))
app.use(cookieParser())
app.use(cors()) ;

// ROUTES MIDDLEWARE
app.use('/api',authRoutes) ;
app.use('/api',userRoutes) ;
app.use('/api',jobTypeRoutes) ;
app.use('/api',jobRoute) ;

// ERROR MIDDLEWARE 
app.use(ErrorHandler) ;


connectDB() ;
// PORT
const PORT =8000 
app.listen(PORT, ()=>{
    console.log(`server is running on PORT : ${PORT}`) ;
})