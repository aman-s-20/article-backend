const  mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }
});


const article = mongoose.model('article', articleSchema);

module.exports = article;