const knex = require('../db/connection')

function list() {
	return knex('reviews').select('*')
}

function update(updatedReview) {
	return knex('reviews')
		.select('*')
		.where({ review_id: updatedReview.review_id })
		.update(updatedReview, '*')
}

function destroy(review_id) {
	return knex('reviews').where({ review_id }).del()
}

function read(reviewId) {
	return knex('reviews').select('*').where({ review_id: reviewId }).first()
}

module.exports = {
	update,
	delete: destroy,
	list,
	read,
}
