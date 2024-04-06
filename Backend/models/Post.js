// import mongoose from 'mongoose';
// import validator from 'validator';

const mongoose = require('mongoose');
const validator = require('validator');


const PostSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true,
        validate: {
            validator: validator.isURL, 
            message:"это должна быть ссылка на картинку"
        }
    },
    content:{
        type: String,
        required: true
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment', // имя модели на которое мы ссылаемся
        required: true
    }]

}, {timestamps: true});

const Post = mongoose.model('Post', PostSchema);

// export default Post;

module.exports = Post

