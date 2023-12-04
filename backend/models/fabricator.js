const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fabrSchema = Schema({
name:{type:String,required:true},
address:{type:String,required:true},
phone:{type:String,required:true},
carPartId:{type:[String],required:true},
});


const Fabricator = mongoose.model('Fabricator',fabrSchema);
module.exports=Fabricator;