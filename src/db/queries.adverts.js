const Advert = require('./models').Advert;

module.exports = {
	getAllAdverts(callback) {
		return Advert.all()
			.then(adverts => {
				callback(null, adverts);
			})
			.catch(err => {
				callback(err);
			});
	}
};
