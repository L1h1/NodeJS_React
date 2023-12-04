const { Router } = require('express');
const Sale = require('../models/sale');
const router = Router();

router.get("/api/sales",(req,res)=>{
    Sale.find().then((data)=>res.send(data))
    .catch((error)=>console.log(error));
});
router.get("/api/sales/details/:id",(req,res)=>{
    Sale.findById(req.params.id).then((data)=>res.send(data))
        .catch((error)=>console.log(error));
});
router.post("/api/sales",(req,res)=>{
    const {amount,carPartId,pricePerPiece,totalPrice} = req.body;
    const sale = new Sale({amount,carPartId,pricePerPiece,totalPrice});
    sale.save()
        .then((result)=>res.send("biba"))
        .catch((error)=>console.log(error));
});
router.put("/api/sales/:id",(req,res)=>{
    const {amount,carPartId,pricePerPiece,totalPrice} = req.body;
    Sale.findByIdAndUpdate(req.params.id,{amount,carPartId,pricePerPiece,totalPrice})
        .then((result)=>res.send("biba"))
        .catch((error)=>console.log(error));
});
router.delete("/api/sales/:id",(req,res)=>{
    Sale.findByIdAndDelete(req.params.id)
        .then((result)=>res.send("biba"))
        .catch((error)=>console.log(error));
});

module.exports=router;