const router = require('express').Router()
const controller = require('./reviews.controller')
// --- methodNotAllowed is a catch all handler that will return messages for unsupported methods --- //
const methodNotAllowed = require('../errors/methodNotAllowed')

router
	.route('/:reviewId')
	.put(controller.update)
	.delete(controller.delete)
	.all(methodNotAllowed)

router.route('/').get(controller.list).all(methodNotAllowed)

module.exports = router
