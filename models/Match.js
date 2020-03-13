const mongoose = require("mongoose"); 
const Schema = mongoose.Schema


const MatchSchema=new Schema({
    equipeA:{
        type:Schema.Types.ObjectId,
        ref:"Equipe"
    },
    equipeB:{
        type:Schema.Types.ObjectId,
        ref:"Equipe"
    },
    title:{
        type:String
    }
})

module.exports=Match=mongoose.model("Match",MatchSchema,"match")