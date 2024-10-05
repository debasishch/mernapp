const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,  // Ensure that email is required
    },
    order_data: {
        type: Array,
        required: true,  // Store the details of the order
    },
    order_date: {
        type: Date,
        default: Date.now,  // Store the current date by default
    },
});

// Export the order model
module.exports = mongoose.model('order', OrderSchema);
