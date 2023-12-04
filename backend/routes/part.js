const { Router } = require('express');
const Part = require('../models/carpart');
const router = Router();

router.get("/api/goods/:categoryId",(req,res)=>{
    Part.find({categoryId:req.params.categoryId}).then((data)=>res.send(data))
    .catch((error)=>console.log(error));
});

router.get("/api/goods/details/:id",(req,res)=>{
    Part.findById(req.params.id).then((data)=>res.send(data))
    .catch((error)=>console.log(error));
});
router.post("/api/goods",(req,res)=>{
    const {article,name,price,categoryId,fabricatorId} = req.body;
    const part = new Part({article,name,price,categoryId,fabricatorId});
    part.save()
    .then((result)=>res.send("biba"))
    .catch((error)=>console.log(error));
});
router.put("/api/goods/:id",(req,res)=>{
    const {article,name,price,categoryId,fabricatorId} = req.body;
    Part.findByIdAndUpdate(req.params.id,{article,name,price,categoryId,fabricatorId})
    .then((result)=>res.send("biba"))
    .catch((error)=>console.log(error));
});
router.delete("/api/goods/:id",(req,res)=>{
    Part.findByIdAndDelete(req.params.id)
    .then((result)=>res.send("biba"))
    .catch((error)=>console.log(error));
});
module.exports=router;