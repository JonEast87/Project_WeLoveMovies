const moviesService = require('./movies.service')

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

module.exports = {
	list,
}
