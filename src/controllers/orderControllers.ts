import { Request, Response, NextFunction } from 'express';
import { OrderModel } from '../models/orderModel';
import { OrderItemModel } from '../models/orderItemModel';

class OrderController {
    static async saveCart(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { user_id, cartItems, delivery_option } = req.body;

            if (!user_id || !cartItems || cartItems.length === 0) {
                res.status(400).json({ message: 'User ID and cart items are required.' });
                return;
            }
            const total_price = cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

            const order = await OrderModel.create({
                user_id,
                delivery_option,
                total_price,
                status: 'pending', 
            });
            const orderItems = cartItems.map((item: any) => ({
                order_id: order.order_id,
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price,
            }));
            await OrderItemModel.bulkCreate(orderItems)
            res.status(201).json({
                message: 'Order saved successfully!',
            });
    }catch(error){
        console.error('Error saving order:', error);
        res.status(500).json({ message: 'Failed to save order.' });
    }
    }
}

export default OrderController