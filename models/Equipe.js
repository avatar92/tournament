const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EquipeSchema=new Schema({
    title:{
        type:String,
        required:true
    }
})


module.exports=Equipe=mongoose.model("Equipe",EquipeSchema,"equipe")