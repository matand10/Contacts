const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
    {
        company: { type: String, required: true },
        desc: { type: String, required: true },
        country: { type: String, required: false, default: null },
        category: { type: String, required: false, default: null },
        jobTitle: { type: String, required: false, default: null },
        price: { type: Number, required: false, default: 20 },
        inStock: { type: Boolean, required: false, default: false },
        name: { type: String, required: false, default: null },
        familyName: { type: String, required: false, default: null },
        email: { type: Array, required: false, default: [] },
        mobile: { type: Array, required: false, default: [] },
        phone: { type: Array, required: false, default: [] },
        linkedinLink: { type: String, required: false, default: null },
        agent: { type: Object, required: false, default: null },
        img: { type: Object, required: false, default: {} },
        createdAt: { type: Date, required: true, default: new Date() },
        transactionHistory: { type: Array, required: false, default: [] },
    },
);

const ChannelModel = mongoose.model("Contact", ContactSchema);
module.exports = ChannelModel
