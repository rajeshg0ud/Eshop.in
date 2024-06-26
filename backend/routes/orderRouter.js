import express from 'express';
import  {addOrderItems, getMyOrders, getOrderById, updateOrderToDelivered, updateOrderToPaid, getOrders} from '../controller/orderController.js';
import { protect, admin } from '../middleWare/authMiddleware.js';

const orderRouter= express.Router();

orderRouter.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
orderRouter.route('/myOrders').get(protect, getMyOrders);
orderRouter.route('/:id').get(protect, getOrderById)
orderRouter.route('/:id/pay').put(protect, updateOrderToPaid);
orderRouter.route('/:id/delivered').put(protect, admin, updateOrderToDelivered);


export default orderRouter;