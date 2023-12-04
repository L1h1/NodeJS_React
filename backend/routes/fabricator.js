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
    const {name,address,phone,carPartId} = req.body;
    const fabr = new Fabr({name,address,phone,carPartId});
    fabr.save()
    .then((result)=>res.send("biba"))
    .catch((error)=>console.log(error));
});
router.put("/api/fabricators/:id",(req,res)=>{
    const {name,address,phone,carPartId} = req.body;
    Fabr.findByIdAndUpdate(req.params.id,{name,address,phone,carPartId})
    .then((result)=>res.send("biba"))
    .catch((error)=>console.log(error));
}); 
router.delete("/api/fabricators/:id",(req,res)=>{
    Fabr.findByIdAndDelete(req.params.id)
    .then((result)=>res.send("biba"))
    .catch((error)=>console.log(error));
});
module.exports=router;