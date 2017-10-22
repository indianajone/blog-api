 // tslint:disable:object-literal-sort-keys
import { Schema } from 'mongoose';

const postSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String, required: false },
    type: { type: String, default: 'text' },
    createdAt: { type: Date, default: Date.now }
},
{
    versionKey: false
});

postSchema.pre('save', function (next) {
    let now = new Date();

    if (!this.createdAt) {
        this.createdAt = now;
    }

    next();
});

export default postSchema;
