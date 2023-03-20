const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        type: { type: String, required: true, unique: true },
        categories: { type: Array, required: true, unique: true, default: [] },
    },
);

module.exports = mongoose.model("Category", CategorySchema);
