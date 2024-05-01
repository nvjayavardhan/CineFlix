const express = require('express')
const Router = express.Router();
const watchedFilms = require('../models/watchedFilms');

Router.post('/addfilms', async (req, res) => {
    try {
        let username = req.body.username;
        let movieData = {
            'movieid': req.body.movieid,
            'datewatch': req.body.date,
            'rating': req.body.rating,
            'review': req.body.review,
            'type': req.body.type
        };
        let UserData = await watchedFilms.findOne({ user: username });
        if (!UserData) {
            UserData = new watchedFilms({ user: username, filmswatched: [] });
        }
    
        UserData.filmswatched.push(movieData);
    
        await UserData.save();
    
        return res.json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, error: error.message });
    }
    
    
})

module.exports=Router;