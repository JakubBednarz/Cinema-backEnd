const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	day: {
		type: String,
		required: true,
	},
	hour: {
		type: String,
		required: false,
	},
	seats: {
		type: Array,
		required: true,
	},
	adult: {
		type: String,
	},
	senior: {
		type: String,
	},
	student: {
		type: String,
	},
	tickets: {
		type: Number,
		required: true,
	}
	// _id: {
	// 	type: Number,
	// 	required: true
	// }
});


movieSchema.methods.validateInput = function () {
    const schema = Joi.object().keys({
		_id: Joi.any(),
        title: Joi.string().required(),
		day: Joi.string().required(),
        hour: Joi.string().required(),
        seats: Joi.array().required(),
		adult: Joi.string(),
        senior: Joi.string(),
		student: Joi.string(),
		tickets: Joi.number().required()
    }).options({abortEarly : false});

    return schema.validate(this.toObject());
}

const Movie = mongoose.model('Movie', movieSchema);

exports.Movie = Movie; 
