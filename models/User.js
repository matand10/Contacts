const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, },
    createdAt: { type: Date, default: new Date(), required: true },
    updatedAt: { type: Date, default: null },
    imgUrl: { type: String, default: null },
    phone: { type: String, default: null },
    address: { type: String, default: null },
    fullname: { type: String, default: null },
    active: { type: Boolean, defaule: true },
    title: { type: String, defaule: null },
    favorites: { type: Array, defaule: [] },
    credits: { type: Number, default: 0, },
    creditTransactions: { type: Array, default: [] },
    contactTransactions: { type: Array, default: [] },
  },
);

module.exports = mongoose.model("User", UserSchema);
