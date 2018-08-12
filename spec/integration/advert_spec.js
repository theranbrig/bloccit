const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/adverts';
const sequelize = require('../../src/db/models/index').sequelize;
const Advert = require('../../src/db/models').Advert;

describe('routes : advert', () => {
	beforeEach(done => {
		this.advert;
		sequelize.sync({ force: true }).then(res => {
			Advert.create({
				title: 'Bloc.io',
				description: 'Learn web development'
			})
				.then(advert => {
					this.advert = advert;
					done();
				})
				.catch(err => {
					console.log(err);
					done();
				});
		});
	});

	describe('GET /adverts', () => {
		it('should return a status code 200 and all adverts', done => {
			request.get(base, (err, res, body) => {
				expect(res.statusCode).toBe(200);
				expect(err).toBeNull();
				expect(body).toContain('Advertisements');
				expect(body).toContain('Bloc.io');
				expect(body).toContain('Learn web development');
				done();
			});
		});
	});
});
