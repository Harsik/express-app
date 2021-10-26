import * as mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true
    });

userSchema.statics.create = function (payload) {
    const user = new this(payload);
    return user.save();
};

userSchema.statics.findAll = function () {
    return this.find({});
};

userSchema.statics.findOneById = function (_id) {
    return this.findOne({ _id });
};

userSchema.statics.findOneByUsername = function (username) {
    return this.findOne({ username });
};

userSchema.statics.updateByUsername = function (username, payload) {
    return this.findOneAndUpdate({ username }, payload, { new: true });
};

userSchema.statics.deleteByUsername = function (username) {
    return this.remove({ username });
};

module.exports = mongoose.model('User', userSchema);