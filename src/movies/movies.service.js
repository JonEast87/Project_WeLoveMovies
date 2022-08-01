const knex = require('../db/connection')

function list() {
	return knex('movies').select('*')
}

function listIsShowing() {
	return knex('movies as m')
		.join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
		.select('m.*')
		.where({ 'mt.is_showing': true })
		.groupBy('m.movie_id')
		.orderBy('m.movie_id')
}

function read(movieId) {
	return knex('movies').select('*').where({ movie_id: movieId }).first()
}

module.exports = {
	list,
	listIsShowing,
	read,
}
