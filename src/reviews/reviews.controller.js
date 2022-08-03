const reviewsService = require('./reviews.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

function list(req, res, next) {
	reviewsService
		.list()
		.then((data) => res.json({ data }))
		.catch(next)
}

function update(req, res, next) {
	const updatedReview = {
		...res.locals.review,
		...req.body.data,
		review_id: res.locals.review.review_id,
	}
	reviewsService
		.update(updatedReview)
		// .then((data) => res.json({ data }))
		.catch(next)
	reviewsService
		.getReviewWithCritic(res.locals.review.review_id)
		.then((data) => res.json({ data }))
		.catch(next)
}

function destroy(req, res, next) {
	reviewsService
		.delete(res.locals.review.review_id)
		.then(() => res.sendStatus(204))
		.catch(next)
}

function reviewExists(req, res, next) {
	reviewsService
		.read(req.params.reviewId)
		.then((review) => {
			if (review) {
				res.locals.review = review
				return next()
			}
			next({ status: 404, message: `Review cannot be found.` })
		})
		.catch(next)
}

module.exports = {
	update: [reviewExists, update],
	delete: [reviewExists, destroy],
	list,
}
