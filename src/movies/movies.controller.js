const moviesService = require('./movies.service')

// removed the async list function due to it causing a "Cannot set headers after they are sent..."
function list(req, res, next) {
	if (req.query.is_showing) {
		moviesService
			.listIsShowing()
			.then((data) => res.json({ data }))
			.catch(next)
	} else {
		moviesService
			.list()
			.then((data) => res.json({ data }))
			.catch(next)
	}
}

function read(req, res) {
	const { movie: data } = res.locals
	res.json({ data })
}

function listMovieTheater(req, res, next) {
	moviesService
		.listMovieTheater(res.locals.movie.movie_id)
		.then((data) => res.json({ data }))
		.catch(next)
}

function listMovieReview(req, res, next) {
	moviesService
		.listMovieReview(res.locals.movie.movie_id)
		.then((data) => res.json({ data }))
		.catch(next)
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
	read: [movieExists, read],
	list: list,
	listMovieTheater: [movieExists, listMovieTheater],
	listMovieReview: [movieExists, listMovieReview],
}
