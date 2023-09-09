const mongoose = require('mongoose');


const AddressSchema = mongoose.Schema({

    HouseNo:{type:String},
    TowerNo:{type:String},
    BuildingNo:{type:String},
    Address:{type:String},
    Landmark:{type:String},
    PhoneNo:{type:String},  
    userId:{type:String},
    
}, {versionKey:false})

const AddressModel = mongoose.model("address", AddressSchema)

module.exports = AddressModel