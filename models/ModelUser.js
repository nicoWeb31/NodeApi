const mongoose =require('mongoose');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');


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
    hashed_password :{
        type :String,
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

userShema.virtual('password')
.set(function(password){
    //create temporary variable called _password
    this._password = password;
    //generate a timestamp
    this.salt = uuidv4();
    //ecrypte password
    this.hashed_password = this.encryptPass(password);
    
})
.get(function(){
    return this._password
})

//methode 
userShema.methods ={
    encryptPass : function(password){
        if(!password) return "";
        try{
            //use node crypto en 'sha1'
            return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
        }catch{
            return "";
        }
    }
}



module.exports = mongoose.model("User" ,userShema )