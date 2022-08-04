const router = require('express').Router()
const controller = require('./movies.controller')
// --- methodNotAllowed is a catch all handler that will return messages for unsupported methods --- //
const methodNotAllowed = require('../errors/methodNotAllowed')
const cors = require('cors')

router.use(cors())

router.route('/:movieId').get(controller.read).all(methodNotAllowed)

router
	.route('/:movieId/theaters')
	.get(controller.listMovieTheater)
	.all(methodNotAllowed)

router
	.route('/:movieId/reviews')
	.get(controller.listMovieReview)
	.all(methodNotAllowed)

router.route('/').get(controller.list).all(methodNotAllowed)

module.exports = router
