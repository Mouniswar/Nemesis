const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema({
    name:{type: String, required:true, trim: true},
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.default.isEmail(value)) {
                throw new Error(`Email is not valid`)
            }
        }
    },
    password: {
        type: String,
        required:true,
        minlength: true,
        trim: true,
        validator(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password')
            }
        }
    },
    gender: {
        type: String
    },
    city:{
        type: String
    },
    pin: {
        type:Number
    },
    changedPasswords:[{
        password: {
            type:String,
            trim:true,
            minItems:0,
            maxItems: 3,
        }
    }],

    tokens:[{
        token: {
            type: String,
            required:true
        }
    }]
})

userSchema.pre('validate', function(next) {
    if(this.changedPasswords.length >= 3) {
        const pwd_arr = this.changedPasswords;
        pwd_arr.shift();
    }
    next();
})

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'innvonix');

    user.tokens = user.tokens.concat({token: token});
    await user.save();

    return token;
}


userSchema.methods.generatePin = async function() {
    const user = this;

    let min = 100, max = 999;
    const randomPin = Math.floor(Math.random() * (max - min + 1)) + min;

    user.pin = randomPin;
    await user.save();
}

userSchema.pre('save', async function(next) {
    const user = this;

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
        user.changedPasswords.push({password: user.password})
    }

    next();
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email})

    if(!user) {
        throw new Error('Unable to Login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Unable to Login')
    }

    return user;
}


const User = mongoose.model('User', userSchema);
module.exports = User;