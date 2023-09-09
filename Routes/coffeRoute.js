const express = require('express');
const CoffeeModel = require("../Model/CoffeeModel")

const coffeRoute = express.Router()

coffeRoute.get("/", async (req, res) => {
    try {
      const { category, _sort, _order, _limit, _page } = req.query;
  
      // Create an empty filter object
      const filter = {};
  
      // Apply additional filters if provided
      if (category) {
        filter.category = category;
      }
  
      // Create the sort object based on sortBy and sortOrder parameters
      let sort = {};
      if (_sort && _order) {
        sort = { [_sort]: _order === "asc" ? 1 : -1 };
      }
  
      // Calculate skip and limit values for pagination
      const perPage = parseInt(_limit) || 10; // Number of items per page (default: 10)
      const page = parseInt(_page) || 1; // Current page (default: 1)
      const skip = (page - 1) * perPage;
  
      // Fetch coffee data with applied filters, sort, and pagination
      const CoffeeData = await CoffeeModel.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(perPage);
  
      // Calculate total count of coffee matching the filters
      const CoffeeCount = await CoffeeModel.countDocuments(filter);
  
      // Calculate total pages based on the total count and items per page
      const totalPages = Math.ceil(CoffeeCount / perPage);
  
      res.json({
        coffee: CoffeeData,
        totalCount: CoffeeCount,
        currentPage: page,
        totalPages: totalPages,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
});

coffeRoute.get("/:id", async(req,res)=>{

    try {
  
      const {id} = req.params
  
      const coffee = await CoffeeModel.find({id:id})
  
      res.json({coffee:coffee})
      
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  
})
  
coffeRoute.post("/add", async(req,res)=>{
    
    try {

        const updatedCoffee = CoffeeModel(req.body)

        await updatedCoffee.save()

        res.json({updatedCoffee : updatedCoffee})
        
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }

})

// admin side
coffeRoute.patch("/patch/:id", async(req,res)=>{

    try {

        const {id} = req.params

        const upatedCoffeeData = await CoffeeModel.findByIdAndUpdate(id, req.body)

        res.json({message:"Updated Dogs"})
        
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }

})

// admin side
coffeRoute.delete("/delete/:id", async(req,res)=>{

    try {

        const {id} = req.params

        const upatedCoffeeData = await CoffeeModel.findByIdAndDelete(id)

        res.json({message:"Deleted Dogs"})
        
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }

})


module.exports = coffeRoute