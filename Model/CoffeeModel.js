const mongoose = require('mongoose');

// Define the schema
const CoffeeSchema = mongoose.Schema({
  id: { type: Number },
  image: { type: String, },
  image2: { type: String, },
  category: { type: String, },
  description: { type: String, },
  color: { type: String, },
  name: { type: String, },
  price: { type: Number, }
});

// Create the model
const CoffeeModel = mongoose.model('coffee', CoffeeSchema);

// Export the model
module.exports = CoffeeModel;
