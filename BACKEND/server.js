import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/UserRoute.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import authMiddleware from './middlewares/auth.js';
import dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 3001;


app.use(express.json());
app.use(cors());// cross - origin resource sharing 

connectDB();

app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use("/images",express.static("uploads")); // basically public ka sara sman "/images" route pr accessible hoga  {yhi problem aa rhi thi mughe bhi }
// app.use(authMiddleware);

app.get('/', (req, res) => {
    res.send('Hello World!')
}
);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);

//