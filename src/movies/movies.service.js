const knex = require('../db/connection')
const mapProperties = require('../utils/map-properties')
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

const addCriticDetails = mapProperties({
	critic_id: 'critic.critic_id',
	preferred_name: 'critic.preferred_name',
	surname: 'critic.surname',
	organization_name: 'critic.organization_name',
})

async function list() {
	if (req.query.is_showing) {
		res.json({ data: await moviesService.listIsShowing() })
	} else {
		res.json({ data: await moviesService.list() })
	}
	next({ status: 404, message: 'Not found' })
}

function listIsShowing() {
	return knex('movies as m')
		.join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
		.select('m.*')
		.where({ 'mt.is_showing': true })
		.groupBy('m.movie_id')
		.orderBy('m.movie_id')
}

function listMovieTheater(movieId) {
	return knex('movies_theaters')
		.join('theaters', 'movies_theaters.theater_id', 'theaters.theater_id')
		.select('*')
		.where({ movie_id: movieId, is_showing: true })
}

function listMovieReview(movieId) {
	return knex('movies')
		.join('reviews', 'reviews.movie_id', 'movies.movie_id')
		.join('critics', 'critics.critic_id', 'reviews.critic_id')
		.select('*')
		.where({ 'reviews.movie_id': movieId })
		.then((reviews) => {
			const reviewsAndCritics = new Array()
			reviews.forEach((review) => {
				reviewsAndCritics.push(addCriticDetails(review))
			})
			return reviewsAndCritics
		})
}

function read(movieId) {
	return knex('movies').select('*').where({ movie_id: movieId }).first()
}

module.exports = {
	list,
	listIsShowing,
	listMovieTheater,
	listMovieReview,
	read,
}
