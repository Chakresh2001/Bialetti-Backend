const mongoose = require('mongoose');


const CartSchema = mongoose.Schema({

    image: { type: String, },
    image2: { type: String, },
    category: { type: String, },
    description: { type: String, },
    color: { type: String, },
    name: { type: String, },
    price: { type: Number, },
    userId : {type : String}
    
}, {versionKey:false})

const CartModel = mongoose.model("cart", CartSchema)

module.exports = CartModel