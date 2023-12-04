const { Router } = require('express');
const Cat = require('../models/category');
const router = Router();

router.get("/api/categories",(req,res)=>{
    Cat.find().then((data)=>res.json(data))
    .catch((error)=>console.log(error));
});

router.post("/api/categories",(req,res)=>{
    const {name} = req.body;
    const category = new Cat({name});
    category.save()
    .then((result)=>res.send("biba"))
    .catch((error)=>console.log(error));
});
router.put("/api/categories/:id",(req,res)=>{
    const{name}=req.body;
    Cat.findByIdAndUpdate(req.params.id,{name})
    .then((result)=>res.send("biba"))
    .catch((error)=>console.log(error));
});
router.delete("/api/categories/:id",(req,res)=>{
    Cat.findByIdAndDelete(req.params.id)
    .then((result)=>res.send("biba"))
    .catch((error)=>console.log(error));
});


module.exports=router;