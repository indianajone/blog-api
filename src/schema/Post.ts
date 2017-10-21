import { Schema } from 'mongoose';

const postSchema = new Schema({
    // tslint:disable-next-line:object-literal-sort-keys
    title: { type: String, required: true },
    // tslint:disable-next-line:object-literal-sort-keys
    body: { type: String, required: true },
    // tslint:disable-next-line:object-literal-sort-keys
    image: { type: String, required: false },
    // tslint:disable-next-line:object-literal-sort-keys
    createdAt: { type: Date, default: Date.now }
});

postSchema.pre('save', function (next) {
    let now = new Date();
    if(!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

export default postSchema;
