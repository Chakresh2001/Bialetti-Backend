const mongoose = require('mongoose');


const AddressSchema = mongoose.Schema({

    HouseNo:{type:String},
    TowerNo:{type:String},
    Building:{type:String},
    Address:{type:String},
    Landmark:{type:String},
    phoneNo:{type:String},  
    userId:{type:String},
    
}, {versionKey:false})

const AddressModel = mongoose.model("address", AddressSchema)

module.exports = AddressModel