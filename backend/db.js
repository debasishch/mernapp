const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://chakrabortydebasish003:debasish6@cluster0.grvp4.mongodb.net/foodapp?retryWrites=true&w=majority&appName=Cluster0';

// Define a schema and model for the food_items collection
const foodItemSchema = new mongoose.Schema({}, { collection: 'food_items' });
const FoodItem = mongoose.model('FoodItem', foodItemSchema);

const mongoDB = async () => {
    try {
        // Connect to MongoDB using Mongoose (no need for useNewUrlParser or useUnifiedTopology anymore)
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");

        // Fetch food_items using Mongoose model
        const foodItems = await FoodItem.find({});
        
        // Fetch foodCategory directly using raw MongoDB connection
        const foodCategoryCollection = mongoose.connection.db.collection('foodCategory');
        
        // Use toArray() to convert the cursor to an array
        const categories = await foodCategoryCollection.find({}).toArray();

        // Assign both foodItems and categories to global variables
        global.food_items = foodItems;
        global.food_categories = categories;

        console.log("Data fetched successfully");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

module.exports = mongoDB;
