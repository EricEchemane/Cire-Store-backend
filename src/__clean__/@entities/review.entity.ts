import { Schema, model, SchemaTypes } from 'mongoose';
import { IProduct } from './product.entity';
import { IUser } from './user.entity';

export interface IReview {
    toProduct: IProduct;
    from: IUser;
    media_urls: string[] | null;
    rating: number;
    text: string;
}

const reviewSchema = new Schema<IReview>({
    toProduct: {
        type: SchemaTypes.ObjectId,
        ref: 'Product',
    },
    from: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
    },
    media_urls: [String],
    text: {
        type: String,
        required: [true, 'Text is required'],
        minLength: [2, 'Text must be at least 2 characters'],
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must be at most 5'],
    }
});

export default model('Review', reviewSchema);