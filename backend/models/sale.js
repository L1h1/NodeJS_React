const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = Schema({
amount:{type:Number,require:true},
carPartId:{type:String,require:true},
pricePerPiece:{type:Number,require:true},
totalPrice:{type:Number,require:true}
},{timestamps:true});


const Sale = mongoose.model('Sale',saleSchema);
module.exports=Sale;