const mongoose =require('mongoose');

const userShema = new mongoose.Schema({
    name :{
        type :String,
        //trim for accept spaces
        trim:true,
        required :true
    },
    email :{
        type :String,
        //trim for accept spaces
        trim:true,
        required :true
    },
    hashed_assword :{
        type :String,
        //trim for accept spaces
        required :true
    },
    salt :String,
    created :{
        type :Date,
        default :Date.now,
    },
    updated : Date

})


//virtual field, additional field for a given model
//don't persist in db

const virtualUserShema = userShema.virtual('password')
.set()
.get()



module.exports = mongoose.model("User" ,userShema )