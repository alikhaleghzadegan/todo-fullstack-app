const mongoose = require('mongoose');
const { Schema } = mongoose;
const validatorjs = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email is required.'],
        unique: true,
        index: true,
        lowercase: true,
        validate: [
            {
                validator: (value) => validatorjs.isEmail(value),
                message: 'email is not valid.'
            }
        ]
    },
    password: {
        type: String,
        required: [true, 'password is required.']
    },
    name: {
        type: String,
        required: [true, 'name is required.'],
        validate: [
            {
                validator: (value) => validatorjs.isLength(value, { min: 3, max: 100 }),
                message: 'name is not between 3 and 100 characters.'
            }
        ]
    },
    tasksList: [{
        text: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: [true, 'status is required.'],
            lowercase: true,
            default: "not_finished",
            enum: {
                values: ['finished', 'not_finished'],
                message: '{VALUE} is not a valid status.'
            }
        },
        creationDate: {
            type: Date,
            default: Date.now
        }
    }]

}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } else {
        next();
    }
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const User = mongoose.model('User', userSchema);
module.exports = User;