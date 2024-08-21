import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
const app = express()
import errorHandler from './src/middlewares/errorHandler';
import userRoutes from './src/routes/userRoutes';
import productRoutes from './src/routes/productRoutes';

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
dotenv.config()
app.use(morgan("dev"))
app.use(helmet());

const TIMES: number = parseInt(process.env.TIMES || '900000', 10)
const MAX: number = parseInt(process.env.MAX || '100', 10);

app.use(
    rateLimit({
        windowMs: TIMES,
        max: MAX,
    })
);

const corsOptions ={
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}
app.use(cors(corsOptions))


app.use('/user', userRoutes)
app.use('/products', productRoutes)

app.use(errorHandler);

const PORT= process.env.PORT
app.listen(PORT, ()=>{console.log(`Listening on PORT ${PORT}`)})
