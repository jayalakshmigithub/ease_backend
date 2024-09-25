import express from 'express';
import cookieParser from 'cookie-parser'
import config from './config/config.js';
import dbConnect from './config/db.js';
import cors from 'cors';
import userRoutes from '../src/routes/userRoutes.js';
import { refreshTokenController } from './controllers/refreshTokecController.js';
import adminRouter from './routes/adminRoutes.js';



const app = express()

dbConnect()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public/'))
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
 
app.use((req,res,next)=>{
    res.setHeader('Cross-Origin-Opener-Policy','same-origin')
    res.setHeader('Cross-Origin-Embeded-Policy','require-corp')
    next()
});
    
app.use('/api/user',userRoutes)
app.use('/api/admin',adminRouter)

app.post('/api/refresh-token', refreshTokenController);

app.listen(config.PORT,()=>{
    console.log(`server running at ${config.PORT} `)
});