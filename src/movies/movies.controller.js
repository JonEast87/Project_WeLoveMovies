const moviesService = require('./movies.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

async function list(req, res, next) {
	if (req.query.is_showing) {
		res.json({ data: await moviesService.listIsShowing() })
	} else {
		res.json({ data: await moviesService.list() })
	}
	next({ status: 404, message: 'Not found' })
}

function movieExists(req, res, next) {
	moviesService
		.read(req.params.movieId)
		.then((movie) => {
			if (movie) {
				res.locals.movie = movie
				return next()
			}
			next({ status: 404, message: 'Movie cannot be found.' })
		})
		.catch(next)
}

function read(req, res) {
	const { movie: data } = res.locals
	res.json({ data })
}

module.exports = {
	read: [asyncErrorBoundary(movieExists), read],
	list: asyncErrorBoundary(list),
}
