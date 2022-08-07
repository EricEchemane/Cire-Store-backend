import { Schema, model, SchemaTypes } from 'mongoose';
import { IProduct } from './product.entity';
import { IUser } from './user.entity';

export interface IOrder {
    product: IProduct;
    bearer: IUser;
    ordered_on: Date;
    quantity: number;
    price: number;
    status: 'to_pay' | 'to_ship' | 'to_receive' | 'completed' | 'cancelled';
    payment_method: 'cod' | 'credit card' | 'paypal' | 'wallet';
}

const orderSchema = new Schema<IOrder>({
    product: {
        type: SchemaTypes.ObjectId,
        ref: 'Product',
    },
    bearer: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
    },
    ordered_on: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        greaterThan: [0, 'Price cannot be 0'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        greaterThan: [0, 'Quantity cannot be 0'],
    },
    payment_method: {
        type: String,
        required: [true, 'Payment method is required'],
        enum: ['cod', 'credit card', 'paypal', 'wallet'],
    },
    status: {
        type: String,
        default: 'to_pay',
        enum: ['to_pay', 'to_ship', 'to_receive', 'completed', 'cancelled'],
    }
});

export default model('Order', orderSchema);