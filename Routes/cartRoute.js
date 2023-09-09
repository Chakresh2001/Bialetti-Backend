const express = require('express');
const CartModel = require('../Model/CartModel');
const userAuth = require('../Middlewares/userAuth');

const cartRoute = express.Router()


cartRoute.post("/add", userAuth, async(req, res)=>{

        try {

        const {userID, userName, userEmail} = req.body.userID
        const {image,image2,category,description,color,name,price} = req.body

        const exsistItem = await CartModel.find({userId:userID}).then((res)=>{
            res[0].name = req.body.name
            return res.status(500).json({error: "item Already in cart"})
        })

        let obj = {
            image: image,
            image2: image2,
            category: category,
            description: description,
            color: color,
            name: name,
            price: price,
            userId : userID
        }
        
        const ItemAdded = CartModel(obj)
        ItemAdded.save()


        res.status(200).json({message:"Item Added Successfully"})
        
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
})

module.exports = cartRoute