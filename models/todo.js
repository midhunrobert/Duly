const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const todoSchema = new Schema({
    title : String,
    status : {
        type:Boolean,
        default:true
    },
    user : {
        type:Schema.Types.ObjectId,
        ref:'User'
    }
});

const todoModel = mongoose.model('todoModel', todoSchema);
module.exports = todoModel;