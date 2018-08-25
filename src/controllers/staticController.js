module.exports = {
	// Index route definition and render templates
	index(req, res, next) {
		res.render('static/index', {
			title: 'Welcome to Bloccit'
		});
	},
	about(req, res, next) {
		res.render('static/about', {
			message: 'About Us'
		});
	},
	marco(req, res, next) {
		res.send('Polo');
	},
	landing(req, res, next) {
		res.render('static/landing')
	}
};
