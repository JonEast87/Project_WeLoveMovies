const moviesService = require('./movies.service')

async function list(req, res, next) {
	if (req.query.is_showing) {
		res.json({ data: await moviesService.listIsShowing() })
	} else {
		res.json({ data: await moviesService.list() })
	}
	next({ status: 404, message: 'Not found' })
}

module.exports = {
	list,
}
