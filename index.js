const express = require('express');
const connectToServer = require('./Config/db');
const coffeRoute = require('./Routes/coffeRoute');
const cors = require("cors");
const userRoute = require('./Routes/userRoute');

const app = express()

app.use(cors())  // DO NOT TOUCH THIS CODE

app.use(express.json())

app.use("/coffee",coffeRoute)

app.use("/user", userRoute)


app.listen(8080, connectToServer(), ()=>{

    console.log(`connect to port 8080`)

})