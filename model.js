const mongoose=require('mongoose');
const itemSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    filename:{
        type:String,
        required:true,
        unique:true
    },
    base64:{
        type:String,
        required:true
    },
    mimeType:{
        type:String,
        required:true
    }
});

const Item=new mongoose.model('Item',itemSchema);
module.exports=Item;