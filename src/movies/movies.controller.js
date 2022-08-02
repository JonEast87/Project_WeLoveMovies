const moviesService = require('./movies.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

// --- made this an async as a walkthrough for fellow team members --- //
async function list(req, res, next) {
	if (req.query.is_showing) {
		res.json({ data: await moviesService.listIsShowing() })
	} else {
		res.json({ data: await moviesService.list() })
	}
	next({ status: 404, message: 'Not found' })
}

function read(req, res) {
	const { movie: data } = res.locals
	res.json({ data })
}

// --- checking to see if movieExists already using params.movieId and passing it to my serviceHandler --- //
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

module.exports = {
	read: [asyncErrorBoundary(movieExists), read],
	list: asyncErrorBoundary(list),
}
