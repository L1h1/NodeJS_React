const { Router } = require('express');
const auth = require("../middleware/auth");
const Cat = require('../models/category');
const router = Router();

router.get("/api/categories",(req,res)=>{
    Cat.find().then((data)=>res.json(data))
    .catch((error)=>console.log(error));
});

router.post("/api/categories",auth,(req,res)=>{
    const {name} = req.body;
    if(name.length <=24 && name.length>0){
        const category = new Cat({name});
        category.save()
        .then((result)=>res.sendStatus(200))
        .catch((error)=>console.log(error));
    }
    else{
        res.sendStatus(400);
    }

});
router.put("/api/categories/:id",auth,(req,res)=>{
    const{name}=req.body;
    if(name.length <=24 && name.length>0){
        Cat.findByIdAndUpdate(req.params.id,{name})
        .then((result)=>res.sendStatus(200))
        .catch((error)=>console.log(error));
    }else{
        res.sendStatus(400);
    }
});
router.delete("/api/categories/:id",auth,(req,res)=>{
    Cat.findByIdAndDelete(req.params.id)
    .then((result)=>res.sendStatus(200))
    .catch((error)=>console.log(error));
});


module.exports=router;