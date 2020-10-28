const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    salary: {
        type: Number
    }
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.pass, 10);
    this.pass = hash;
    next();
})

const User = mongoose.model('user', UserSchema);

module.exports = User;