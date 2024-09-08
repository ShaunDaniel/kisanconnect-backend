import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
    category: { type: String, required: true },
    productName: { type: String, required: true },
    variety: { type: String, required: true },
    grade: { type: String, required: true },
    image: { type: Object },
    quantityAvailable: { type: Number, required: true },
    quantityUnit: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String, required: true },
    harvestDate: { type: Date, required: true },
    expectedShelfLife: { type: Number, required: true },
    organic: { type: Boolean, required: true },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    description: { type: String},
});


const User = mongoose.model('Product', productSchema);

export default User