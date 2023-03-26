const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre('save', function (next) {
    // const user = this;

    const hash = bcrypt.hashSync(this.password, 10);
    this.password = hash;
    next();
});

userSchema.methods.isValidPassword = function (password) {
    const user = this;
    const compare = bcrypt.compareSync(password, user.password);
    return compare;
};

module.exports = mongoose.model('User', userSchema);
