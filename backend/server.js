import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
dotenv.config();
import connectToDB from './config/db.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import productRouter from './routes/productRouter.js';
import { errorHandler, notFound } from './middleWare/errorMidleware.js';
import userRouter from './routes/userRouter.js';
import orderRouter from './routes/orderRouter.js';

const app= express();
const port= process.env.PORT || 4000;
connectToDB();

const __dirname = dirname(fileURLToPath(import.meta.url));  //dirname to get directory, fileurltopatch converts url to the path, import.met.url gives url of the current file
app.use('/images', express.static(join(__dirname, 'images'))); //join method joins both paths (full path gets)

//body parser middleware
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

app.use(cookieParser())

app.use('/api/products', productRouter);

app.use('/api/users', userRouter);

app.use('/api/orders', orderRouter);

app.get('/api/config/paypal', (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});


app.get('/', (req, res)=>{
    res.send("hello from server");
})

app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=> console.log(`server is running on port ${port}`))