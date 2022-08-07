import { Schema, model, SchemaTypes } from 'mongoose';
import { IUser } from './user.entity';

export interface IStore {
    name: string;
    logo_url: string;
    rating: number;
    owner: IUser;
    products: [];
}

const storeSchema = new Schema<IStore>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [5, 'Name must be at least 5 characters'],
        unique: true,
    },
    logo_url: {
        type: String,
        validate: {
            validator: function (url: string) {
                return (url.startsWith('http://') || url.startsWith('https://'));
            },
            message: 'Logo url must start with http:// or https://',
        }
    },
    rating: {
        type: Number,
        default: 1,
        max: [5, 'Rating must be at most 5'],
    },
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
    },
    products: {
        type: [SchemaTypes.ObjectId],
        ref: 'Product',
    }
});

export default model('Store', storeSchema);