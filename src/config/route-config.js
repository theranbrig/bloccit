// Loads defined routes from and defines on Express app object

module.exports = {
	init(app) {
		const staticRoutes = require('../routes/static');
		app.use(staticRoutes);
	}
};
