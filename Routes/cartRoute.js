const express = require('express');
const CartModel = require('../Model/CartModel');
const userAuth = require('../Middlewares/userAuth');

const cartRoute = express.Router()


cartRoute.post("/add", userAuth, async(req, res)=>{

        try {

        const {userID, userName, userEmail} = req.userInfo
        const {image,image2,category,description,color,name,price,quantity} = req.body



        let obj = {
            image: image,
            image2: image2,
            category: category,
            description: description,
            color: color,
            name: name,
            price: price,
            quantity:quantity,
            userId : userID
        }
        const ItemAdded = CartModel(obj)
        ItemAdded.save()


        res.status(200).json({message:"Item Added Successfully"})
        
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
})


cartRoute.get("/", userAuth, async(req,res)=>{
    try {

        const {userID, userName, userEmail} = req.userInfo

        let cartItem = await CartModel.find({userId:userID})

        res.status(200).json({message:cartItem})
        
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
})

// admin use
cartRoute.get("/all", async(req,res)=>{
    try {

        
        let cartItem = await CartModel.find()

        res.status(200).json({message:cartItem})
        
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
})

cartRoute.delete("/:id", userAuth , async(req,res)=>{
    try {

        const {userID, userName, userEmail} = req.userInfo
        const {id} = req.params

        await CartModel.findByIdAndDelete(id)
        res.status(200).json({message:"Item Deleted Successfully"})
        

        
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
})

module.exports = cartRoute