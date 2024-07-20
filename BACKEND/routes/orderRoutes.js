import express from 'express';
import { listUserOrders, placeOrder , listAllOrders  , updateStatus} from '../controllers/orderControllers.js';
import authMiddleware from '../middlewares/auth.js';

const orderRouter = express.Router();

orderRouter.post('/placeorder', authMiddleware, placeOrder);
orderRouter.post('/userorders', authMiddleware, listUserOrders);
orderRouter.get('/allorders', listAllOrders);
orderRouter.post('/updatestatus', updateStatus);

export default orderRouter;