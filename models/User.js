const mongoose =require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    bloodgroup:{
        type:String,
        default:""
    },
    mobile:{
        type:Number
    },
    currentsem:{
        type:String,
    },
    interests:{
        type:Array,
        default:[]
    },
    experience:{
        type:Array,
        default:[]
    },
    donatingblood:{
        type:Boolean,
        default:false
    },
    pic:{
        type:String,
        default:"image"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}],
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = User =mongoose.model("User",userSchema);