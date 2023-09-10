const express = require('express');
const userAuth = require('../Middlewares/userAuth');
const AddressModel = require('../Model/AddressModel');

const addressRoute = express.Router()

addressRoute.post("/add", userAuth, async(req,res)=>{
    try {

        const {userID, userName, userEmail} = req.userInfo
        const {HouseNo,TowerNo,BuildingNo,Address,Landmark,PhoneNo} = req.body

        const obj = {
            HouseNo : HouseNo,
            TowerNo : TowerNo,
            BuildingNo : BuildingNo,
            Address : Address,
            Landmark : Landmark,
            PhoneNo : PhoneNo,
            userId : userID
        }

        const address = AddressModel(obj)
        address.save()

        res.status(200).json({message:"Address Added Successfully"})

        
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
})

addressRoute.get("/", userAuth, async(req,res)=>{
    try {

        const {userID, userName, userEmail} = req.userInfo

        let address = await AddressModel.find({userId:userID})

        res.status(200).json({message:address})
        
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
})

addressRoute.delete("/:id",  async(req,res)=>{
    try {

        const {id} = req.params

        await AddressModel.findByIdAndDelete(id)
        res.status(200).json({message:"Address Deleted Successfully"})

        
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
})

module.exports = addressRoute