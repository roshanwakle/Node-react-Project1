const mongoose = require('mongoose')

const Schema = mongoose.Schema


const  bannerSchema = new Schema({
    description:{
        type:String,
        required:true
    },
    bannerImage:{
        type:String,
        required:false
    },
    bannerId:{
        type:String,
        required:true
    }

},{timestamps:true})

const banner = mongoose.model("Banner", bannerSchema);


module.exports = banner;
