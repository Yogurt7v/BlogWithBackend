
const mongoose = require('mongoose');


const CommentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // имя модели на которое мы ссылаемся
        required: true
    }

}, {timestamps: true});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment
