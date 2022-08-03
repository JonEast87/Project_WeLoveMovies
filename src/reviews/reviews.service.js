const knex = require('../db/connection')
const mapProperties = require('../utils/map-properties')

const addCriticDetails = mapProperties({
	preferred_name: 'critic.preferred_name',
	surname: 'critic.surname',
	organization_name: 'critic.organization_name',
})

function getReviewWithCritic(reviewId) {
	return knex('reviews')
		.join('critics', 'reviews.critic_id', 'critics.critic_id')
		.select('*')
		.where({ review_id: reviewId })
		.first()
		.then((result) => {
			const updatedReview = addCriticDetails(result)
			return updatedReview
		})
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
	getReviewWithCritic,
	delete: destroy,
	read,
}
