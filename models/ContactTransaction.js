const mongoose = require("mongoose");

const ContactTransactionSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, default: null },
        type: { type: String, required: true, default: null },
        contactId: { type: String, required: true, default: null },
        name: { type: String, default: null },
        familyName: { type: String, default: null },
        jobTitle: { type: String, default: null },
        price: { type: Number, default: 0 },
        category: { type: String, default: null },
        company: { type: String, default: null },
        mobile: { type: String, default: null },
        phone: { type: String, default: null },
        inStock: { type: Boolean, default: false },
        img: { type: String, default: null },
        contactPriceInCredit: { type: Number, default: 0 },
        createdAt: { type: Date, required: true, default: new Date() }
    },
);

module.exports = mongoose.model("ContactTransaction", ContactTransactionSchema);
