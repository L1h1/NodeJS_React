const { Router } = require('express');
const auth = require("../middleware/auth");
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
router.post("/api/sales",auth,(req,res)=>{
    const {amount,carPartId,pricePerPiece,totalPrice} = req.body;
    if(amount>0 && pricePerPiece>0 && totalPrice>0){
        const sale = new Sale({amount,carPartId,pricePerPiece,totalPrice});
        sale.save()
            .then((result)=>res.sendStatus(200))
            .catch((error)=>console.log(error));
    }else{
        res.sendStatus(400);
    }

});
router.put("/api/sales/:id",auth,(req,res)=>{
    if(amount>0 && pricePerPiece>0 && totalPrice>0){
        const {amount,carPartId,pricePerPiece,totalPrice} = req.body;
        Sale.findByIdAndUpdate(req.params.id,{amount,carPartId,pricePerPiece,totalPrice})
            .then((result)=>res.sendStatus(200))
            .catch((error)=>console.log(error));
    }else{
        res.sendStatus(400);
    }
    
});
router.delete("/api/sales/:id",auth,(req,res)=>{
    Sale.findByIdAndDelete(req.params.id)
        .then((result)=>res.sendStatus(200))
        .catch((error)=>console.log(error));
});

module.exports=router;