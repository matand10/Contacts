const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        desc: { type: String, required: true },
        countries: { type: Array, required: false, default: [] },
        categories: { type: Array, required: false, default: [] },
        jobTitle: { type: Array, required: false, default: [] },
        price: { type: Number, required: false, default: 0 },
        inStock: { type: Boolean, required: false, default: false },
        name: { type: String, required: false, default: null },
        familyName: { type: String, required: false, default: null },
        email: { type: Array, required: false, default: [] },
        mobile: { type: Array, required: false, default: [] },
        phone: { type: Array, required: false, default: [] },
        linkedinLinks: { type: Array, required: false, default: [] },
        agents: { type: Array, required: false, default: [] },
        img: { type: String, required: false },
        createdAt: { type: Date, required: true, default: new Date() },
    },
);

const ChannelModel = mongoose.model("contacts", ContactSchema);
module.exports = ChannelModel
