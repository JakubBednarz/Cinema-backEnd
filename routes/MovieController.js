const {Movie} = require('../models/movie');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/:title/:day/:hour', async (req, res) => {
	try {
	  const movies = await Movie.find({title: req.params.title}).find({day: req.params.day}).find({hour: req.params.hour});
	  res.send(movies);
	}
	catch(ex) {
        console.log(ex);
        return res.status(500).send('There was an error while processing the request');
    }
});

router.post('/', validateMovie, async (req, res) => {
	try {
		movie = await req.movie.save();
		res.send(req.movie);
	}
    catch(ex) {
        console.log(ex);
        return res.status(500).send('There was an error while processing the request');
    }
});

async function validateMovie(req, res, next) {
	try {
		if (req.movie === undefined) {
			req.movie = new Movie();
		}

		req.movie.title = req.body.title;
		req.movie.day = req.body.day;
		req.movie.hour = req.body.hour;
		req.movie.seats = req.body.seats;
		req.movie.tickets = req.body.tickets;

		let validationResult = req.movie.validateInput();

		if (validationResult.error !== undefined) {
			return res.status(400).send(validationResult.error.details.map(i => i.message).join("\r\n"));
		}

		next();
	}
	catch(ex) {
        console.log(ex);
        return res.status(500).send('There was an error while processing the request');
    }
}

module.exports = router;
