import order from '../models/orderModel.js';
import asyncHandler from '../middleWare/asyncHandler.js';

const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items found');
    } else {
        const placeOrder = new order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createOrder = await placeOrder.save();

        res.status(201).json({ message: "Order has been placed successfully", order: createOrder });
    }
});


const getMyOrders= asyncHandler(async(req, res, next)=>{
    const orders= await order.find({user: req.user._id})

    res.status(200).json(orders)
});

const getOrderById= asyncHandler(async(req, res, next)=>{
    const getOrder = await order.findById(req.params.id).populate(
        'user',
        'name emailId'
      )
     if(getOrder){
        res.status(200).json(getOrder)
     }
     else{
        res.status(400)
        throw new Error('unable to get the order, check the order id')
     }
});

const updateOrderToDelivered= asyncHandler(async(req, res, next)=>{
    res.send("updateOrderToDelivered")
});

const updateOrderToPaid = asyncHandler(async (req, res, next) => {
    const Order = await order.findById(req.params.id);
    console.log(req.body)
    
    if (Order) {
        console.log("its working inside statement")
        Order.isPaid = true;
        Order.paidAt = Date.now();
        Order.paymentResult = {
            id: req.body?.id,
            status: req.body?.status,
            update_time: req.body?.update_time,
            email_address: req.body?.payer?.email_address,
            name: `${req.body?.payer?.given_name} ${req.body?.payer?.surname}`,
     };

        const updatedOrder = await Order.save();
        console.log("its working after save")

        res.status(200).json(updatedOrder);
    } else {
        console.log("its working in error")
        res.status(404);
        throw new Error('Order not found');
    }
});


const getOrders= asyncHandler(async(req, res, next)=>{
    res.send("getOrders")
});

export {addOrderItems, getMyOrders, getOrderById, updateOrderToDelivered, updateOrderToPaid, getOrders};