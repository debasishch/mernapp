const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

// Route to handle order data
// Backend route to handle new or updated orders
router.post('/orderData', async (req, res) => {
  const orderDetails = {
    Order_date: Date.now(),  // Automatically store the current date
    items: req.body.order_data // Ensure this includes the img field
  };

  let existingOrder = await Order.findOne({ email: req.body.email });

  if (existingOrder === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [orderDetails]  // Save the order details including images
      });
      res.json({ success: true, message: 'Order created successfully' });
    } catch (error) {
      console.error('Error creating order:', error.message);
      res.status(500).json({ error: 'Failed to create order' });
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: orderDetails } }  // Push new order including images
      );
      res.json({ success: true, message: 'Order updated successfully' });
    } catch (error) {
      console.error('Error updating order:', error.message);
      res.status(500).json({ error: 'Failed to update order' });
    }
  }
});

router.post('/myorderData', async (req, res) => {
  try{
    
    let myData = await Order.findOne({'email': req.body.email})
    res.json({orderData:myData})
  } catch(error){
    res.send("Server Error", error.message)
  }
  })
module.exports = router;
