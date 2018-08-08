require('dotenv').config();
const path = require('path');
const viewsFolder = path.join(__dirname, '..', 'views');

// Set view location for template engine and set where to find static assets
module.exports = {
	init(app, express) {
		app.set('views', viewsFolder);
		app.set('view engine', 'ejs');
		app.use(express.static(path.join(__dirname, '..', 'assets')));
	}
};
