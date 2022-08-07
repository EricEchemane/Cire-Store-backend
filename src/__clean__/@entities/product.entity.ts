import { Schema, model, SchemaTypes } from 'mongoose';

export interface IProduct {
    name: string;
    description: string;
    price: number;
    rating: number;
    display_medias_url: string[] | null;
    tags: string[];
    variants: [];
    reviews: [];
    created_at: Date;
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [5, 'Name must be at least 5 characters'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [10, 'Description must be at least 10 characters'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        greaterThan: [0, 'Price cannot be 0'],
    },
    rating: {
        type: Number,
        default: 1,
        max: [5, 'Rating must be at most 5'],
    },
    tags: [String],
    display_medias_url: [String],
    variants: [{ label: String, price: Number }],
    reviews: {
        type: [SchemaTypes.ObjectId],
        ref: 'Review',
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export default model('Product', productSchema);