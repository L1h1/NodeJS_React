const express = require("express");
const mongoose = require("mongoose");

const saleRouter = require("./routes/sale");
const categoryRouter = require("./routes/category");
const fabricatorRouter = require("./routes/fabricator");
const carpartRouter = require("./routes/part");
const CategoryModel = require('./models/category');

const PORT = 5000;
const app = express();
app.use(express.json());


app.use(saleRouter);
app.use(categoryRouter);
app.use(fabricatorRouter);
app.use(carpartRouter);


app.get("/api",(req,res)=>{

    res.send("aboba");
});









async function start(){
    try{
        await mongoose
            .connect('mongodb://127.0.0.1:27017/shop',{})
            .then((res)=>console.log('db online'))
            .catch((error)=>console.log(error));        
            app.listen(PORT,()=>console.log('server started on port 5000'));
    }catch(e){
        console.log(e);
    }
}
start();
