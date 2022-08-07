import { Schema, model, SchemaTypes } from 'mongoose';
import Hasher from 'utils/hasher';
import { isValidEmail } from 'utils/validators';
import { IStore } from './store.entity';

export interface IUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone_number: string;
    address: string;

    wallet?: number;
    created_at?: Date;
    store?: IStore;
    cart?: [],
    orders?: [],
    reviews?: [],
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: isValidEmail,
            message: 'Invalid email'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    firstName: {
        type: String,
        required: [true, 'Firstname is required'],
        minLength: [2, 'Firstname must be at least 2 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Lastname is required'],
        minLength: [2, 'Lastname must be at least 2 characters']
    },
    phone_number: {
        type: String,
        required: [true, 'Mobile is required'],
        validate: {
            validator: function (phoneNumber: string) {
                return /^(09|\+639)\d{9}$/.test(phoneNumber);
            }
        }
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        minLength: [20, 'Address must be a complete address']
    },
    wallet: {
        type: Number,
        default: 0,
    },
    cart: {
        type: [{
            product: {
                type: SchemaTypes.ObjectId,
                ref: 'Product'
            },
            price: {
                type: Number,
                greaterThan: [0, 'Price cannot be 0']
            },
            quantity: {
                type: Number,
                greaterThan: [0, 'Quantity cannot be 0']
            }
        }]
    },
    orders: {
        type: [SchemaTypes.ObjectId],
        ref: 'Order'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    store: {
        type: SchemaTypes.ObjectId,
        ref: 'Store'
    }
});

userSchema.pre('save', function (next) {
    this.password = Hasher.hash(this.password);
    next();
});

export default model('User', userSchema);