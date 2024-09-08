import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = new Schema({
    userType: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String },
    city: { type: String, required: true, default: '-' },
    state: { type: String, required: true, default: '-' },
    profilePicture: { type: String },
    businessName: { type: String },
    businessAddress: { type: String },
    landArea: { type: String },
    farmingType: { type: String },
    hasTransportService: { type: Boolean, default: false },
    isCertified: { type: Boolean, default: false },
    istermsAccepted: { type: Boolean, required: true, default: false },
});

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

const User = mongoose.model('User', userSchema);

export default User