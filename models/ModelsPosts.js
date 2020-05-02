const mongoose =require('mongoose');

// creation du shéma met de mongoose
const postShema = new mongoose.Schema({
    title : {
        type :String,
        required : "Title is required",
        minlength :4,
        maxlength:150
    },
    body :{
        type :String,
        required : "Content is required",
        minlength :50,
        maxlength:1500
    }
});
