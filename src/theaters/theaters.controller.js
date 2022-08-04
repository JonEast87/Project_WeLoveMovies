const theatersSerivce = require('./theaters.service')

function list(req, res, next) {
	theatersSerivce
		.list()
		.then((data) => res.json({ data }))
		.catch(next)
}

module.exports = {
	list,
}
