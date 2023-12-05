const { Router } = require('express');
const Fabr = require('../models/fabricator');
const router = Router();
router.get("/api/fabricators",(req,res)=>{
    Fabr.find().then((data)=>res.send(data))
    .catch((error)=>console.log(error));
});
router.get("/api/fabricators/details/:id",(req,res)=>{
    Fabr.findById(req.params.id).then((data)=>res.send(data))
    .catch((error)=>console.log(error));
});
router.post("/api/fabricators",(req,res)=>{
    const {name,address,phone} = req.body;
    const regex = /^\+375\(\d{2}\)\d{7}$/;
    if(name.length>0 && name.length<=64 && address.length>0 && address.length<=128
        && regex.test(phone)){
        const fabr = new Fabr({name,address,phone});
        fabr.save()
        .then((result)=>res.sendStatus(200))
        .catch((error)=>console.log(error));
    }else{
        res.sendStatus(400);
    } 
});
router.put("/api/fabricators/:id",(req,res)=>{
    const {name,address,phone} = req.body;
    const regex = /^\+375\(\d{2}\)\d{7}$/;
    if(name.length>0 && name.length<=64 && address.length>0 && address.length<=128
        && regex.test(phone)){
            Fabr.findByIdAndUpdate(req.params.id,{name,address,phone})
            .then((result)=>res.sendStatus(200))
            .catch((error)=>console.log(error));
    }else{
        res.sendStatus(400);
    }
    
}); 
router.delete("/api/fabricators/:id",(req,res)=>{
    Fabr.findByIdAndDelete(req.params.id)
    .then((result)=>res.sendStatus(200))
    .catch((error)=>console.log(error));
});
module.exports=router;