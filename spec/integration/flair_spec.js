const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/topics';

const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require('../../src/db/models').Topic;
const Flair = require('../../src/db/models').Flair;

describe('routes : flair', () => {
	beforeEach(done => {
		this.topic;
		this.flair;

		sequelize.sync({ force: true }).then(res => {
			//#1
			Topic.create({
				title: 'Winter Games',
				description: 'Post your Winter Games stories.'
			}).then(topic => {
				this.topic = topic;

				Flair.create({
					name: 'Hot Topic',
					color: 'red',
					topicId: this.topic.id
				})
					.then(flair => {
						this.flair = flair;
						done();
					})
					.catch(err => {
						console.log(err);
						done();
					});
			});
		});
	});
	describe('GET /topics/:topicId/flair/new', () => {
		it('should render a new flair form', done => {
			request.get(`${base}/${this.topic.id}/flair/new`, (err, res, body) => {
				expect(err).toBeNull();
				expect(body).toContain('New Flair');
				done();
			});
		});
	});
	describe('POST /topics/:topicId/flair/create', () => {
		it('should create a new flair and redirect', done => {
			const options = {
				url: `${base}/${this.topic.id}/flair/create`,
				form: {
					name: 'Red Hot',
					color: 'green'
				}
			};
			request.post(options, (err, res, body) => {
				Flair.findOne({ where: { name: 'Red Hot' } })
					.then(flair => {
						expect(flair).not.toBeNull();
						expect(flair.name).toBe('Red Hot');
						expect(flair.color).toBe('green');
						expect(flair.topicId).not.toBeNull();
						done();
					})
					.catch(err => {
						console.log(err);
						done();
					});
			});
		});
	});
	describe('GET /topics/:topicId/flair/:id', () => {
		it('should render a topic with the selected flair', done => {
			request.get(
				`${base}/${this.topic.id}/flair/${this.flair.id}`,
				(err, res, body) => {
					expect(err).toBeNull();
					expect(body).toContain('Hot Topic');
					done();
				}
			);
		});
	});
	describe('GET /topics/:topicId/flair/:id/edit', () => {
		it('should render a view with an edit flair form', done => {
			request.get(
				`${base}/${this.topic.id}/flair/${this.flair.id}/edit`,
				(err, res, body) => {
					expect(err).toBeNull();
					expect(body).toContain('Edit Flair');
					expect(body).toContain('Hot Topic');
					done();
				}
			);
		});
	});
	describe('POST /topics/:topicId/flair/:id/update', () => {
		it('should return a status code 302', done => {
			request.post(
				{
					url: `${base}/${this.topic.id}/flair/${this.flair.id}/update`,
					form: {
						name: 'Hottie Topic',
						color: 'blue'
					}
				},
				(err, res, body) => {
					expect(res.statusCode).toBe(302);
					done();
				}
			);
		});

		it('should update the flair with the given values', done => {
			const options = {
				url: `${base}/${this.topic.id}/flair/${this.flair.id}/update`,
				form: {
					name: 'Hottie Topic'
				}
			};
			request.post(options, (err, res, body) => {
				expect(err).toBeNull();
				Flair.findOne({
					where: { id: this.flair.id }
				}).then(flair => {
					expect(flair.name).toBe('Hottie Topic');
					done();
				});
			});
		});
	});
});
