const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carpartSchema = Schema({
article:{type:String,required:true},
name:{type:String,required:true},
price:{type:Number,required:true},
categoryId:{type:String,required:true},
fabricatorId:{type:String,required:true}
});


const CarPart = mongoose.model('carpart',carpartSchema);
module.exports=CarPart;