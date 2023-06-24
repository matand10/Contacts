const mongoose = require("mongoose");

const ContactRequestSchema = new mongoose.Schema(
    {
        contact: { type: Object, required: true, default: null },
        isApproved: { type: Boolean, required: true, default: false },
        status: { type: String, required: true, default: 'pending' },
        createdAt: { type: Date, required: true, default: new Date() },
        updateAt: { type: Date, required: false, default: null },
    },
);

module.exports = mongoose.model("ContactRequest", ContactRequestSchema);
