const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/adverts/';
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

	describe('GET /adverts/new', () => {
		it('should render a new advert form', done => {
			request.get(`${base}new`, (err, res, body) => {
				expect(err).toBeNull();
				expect(body).toContain('New Advertisement');
				done();
			});
		});
	});

	describe('POST /adverts/create', () => {
		const options = {
			url: `${base}create`,
			form: {
				title: 'Pizza Pizza',
				description: 'Best in the business'
			}
		};
		it('should create a new topic and redirect', done => {
			request.post(options, (err, res, body) => {
				Advert.findOne({ where: { title: 'Pizza Pizza' } })
					.then(topic => {
						expect(res.statusCode).toBe(303);
						expect(topic.title).toBe('Pizza Pizza');
						expect(topic.description).toBe('Best in the business');
						done();
					})
					.catch(err => {
						console.log(err);
						done();
					});
			});
		});
	});

	describe('GET /adverts/:id', () => {
		it('should render a view with an advert', done => {
			request.get(`${base}${this.advert.id}`, (err, res, body) => {
				expect(err).toBeNull();
				expect(body).toContain('Bloc.io');
				done();
			});
		});
	});

	describe('POST /adverts/:id/destroy', () => {
		it('should delete the advert with the specified id', done => {
			Advert.all().then(adverts => {
				const advertCountBeforeDelete = adverts.length;
				expect(advertCountBeforeDelete).toBe(1);
				request.post(`${base}${this.advert.id}/destroy`, (err, res, body) => {
					Advert.all().then(adverts => {
						expect(err).toBeNull();
						expect(adverts.length).toBe(advertCountBeforeDelete - 1);
						done();
					});
				});
			});
		});
	});
	describe('GET /advert/:id/edit', () => {
		it('should render a view with an edit advert form', done => {
			request.get(`${base}${this.advert.id}/edit`, (err, res, body) => {
				expect(err).toBeNull();
				expect(body).toContain('Edit Advertisement');
				expect(body).toContain('Bloc.io');
				done();
			});
		});
	});
	describe('POST /adverts/:id/update', () => {
		it('should update the advert with the given values', done => {
			const options = {
				url: `${base}${this.advert.id}/update`,
				form: {
					title: 'BLOC Learning',
					description: 'There are a lot of them'
				}
			};
			request.post(options, (err, res, body) => {
				expect(err).toBeNull();
				Advert.findOne({
					where: { id: this.advert.id }
				}).then(advert => {
					expect(advert.title).toBe('BLOC Learning');
					done();
				});
			});
		});
	});
});
