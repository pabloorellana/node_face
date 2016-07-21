var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PostSchema = new Schema({
    description: { type: String, required: true },
    createdAt:  { type: Date, default: Date.now },
    comments: [{ text: String, createdAt: { type: Date, default: Date.now }}],
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Post', PostSchema)
