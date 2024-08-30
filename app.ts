import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'
const app = express()
import errorHandler from './src/middlewares/errorHandler';
import userRoutes from './src/routes/userRoutes';
import productRoutes from './src/routes/productRoutes';
import categoryRoutes from './src/routes/categoryRoutes';


app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// app.use(cookieParser())


dotenv.config()
app.use(morgan("dev"))
app.use(helmet());



// const TIMES: number = parseInt(process.env.TIMES || '900000', 10)
// const MAX: number = parseInt(process.env.MAX || '100', 10);

// app.use(
//     rateLimit({
//         windowMs: TIMES,
//         max: MAX,
//     })
// );

const corsOptions ={
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}
app.use(cors(corsOptions))
//url en env

app.use('/user', userRoutes)
app.use('/products', productRoutes)
app.use('/categories', categoryRoutes)

app.use(errorHandler);

const PORT= process.env.PORT
app.listen(PORT, ()=>{console.log(`Listening on PORT ${PORT}`)})
