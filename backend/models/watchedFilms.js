const mongoose=require('mongoose');
const {Schema}=mongoose;

const watchedFilmsSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    filmswatched: [{
        movieid: {
            type: Number,
            required: true
        },
        datewatch: {
            type: Date,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        review: {
            type: String,
            required: true
        },
        type:{
            type:String,
            required:true
        }
    }]
});

module.exports=mongoose.model('watchedFilms',watchedFilmsSchema)