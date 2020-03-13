const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TounamentSchema= new Schema({
    matchA:{
        type:Schema.Types.ObjectId,
        ref:"Match"
    },
    matchB:{
        type:Schema.Types.ObjectId,
        ref:"Match"
    },
    title:{
        type:String
    }

})


module.exports=Tournament=mongoose.model('Tournament',TounamentSchema,"tournament")