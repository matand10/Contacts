const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false, },
    createdAt: { type: Date, default: new Date(), required: true },
    updatedAt: { type: Date, required: true, default: null },
    imgUrl: { type: String, required: true, default: null },
    phone: { type: String, required: true, default: null },
    address: { type: String, required: true, default: null },
    fullname: { type: String, required: true, default: null },
    active: { type: Boolean, required: true, defaule: true },
    gender: { type: String, required: true, defaule: null },
    permissions: { type: Array, required: true, defaule: [] },
    favorites: { type: Array, required: true, defaule: [] },
    credits: { type: Number, required: true, default: 0, },
    creditTransactions: { type: Array, required: true, default: [] },
    contactTransactions: { type: Array, required: true, default: [] },
    contactUploads: { type: Array, required: true, default: [] },
    searchHistory: { type: Array, required: true, default: [] },
  },
);

module.exports = mongoose.model("User", UserSchema);
