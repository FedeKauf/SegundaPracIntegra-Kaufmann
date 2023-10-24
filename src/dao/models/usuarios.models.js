import mongoose from "mongoose";

export const modeloUsuarios=mongoose.model('usuarios', new mongoose.Schema({
    nombre: String,
    apellido: String, 
    email: {
        type: String, unique:true
    },
    password: String,
    cartId : {required : true, type:mongoose.Schema.Types.ObjectId},
    typeofuser : String,
    age : Number,
    last_name : String,
    github: {}
}))

