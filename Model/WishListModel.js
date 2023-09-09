const mongoose = require('mongoose');


const WishListSchema = mongoose.Schema({

    image: { type: String, },
    image2: { type: String, },
    category: { type: String, },
    description: { type: String, },
    color: { type: String, },
    name: { type: String, },
    price: { type: Number, },
    quantity : {type:Number},
    userId : {type : String}
    
}, {versionKey:false})

const WishListModel = mongoose.model("wishlist", WishListSchema)

module.exports = WishListModel