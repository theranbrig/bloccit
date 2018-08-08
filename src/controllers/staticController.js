module.exports = {
	// Index route definition and render templates
	index(req, res, next) {
		res.render('static/index', {
			title: 'Welcome to Bloccit'
		});
	}
};
