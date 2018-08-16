const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require('../../src/db/models').Topic;
const Flair = require('../../src/db/models').Flair;

describe('Post', () => {
	beforeEach(done => {
		//#1
		this.topic;
		this.flair;
		sequelize.sync({ force: true }).then(res => {
			//#2
			Topic.create({
				title: 'Hockey',
				description: 'Fastest game on earth.'
			})
				.then(topic => {
					this.topic = topic;
					Flair.create({
						name: 'Hot Content',
						color: 'red',
						topicId: this.topic.id
					}).then(flair => {
						this.flair = flair;
						done();
					});
				})
				.catch(err => {
					console.log(err);
					done();
				});
		});
	});
	describe('#create()', () => {
		it('should create a flair object with a name, color, and assigned topic', done => {
			//#1
			Flair.create({
				name: 'Cold Topic',
				color: 'blue',
				topicId: this.topic.id
			})
				.then(flair => {
					//#2
					expect(flair.name).toBe('Cold Topic');
					expect(flair.color).toBe('blue');
					done();
				})
				.catch(err => {
					console.log(err);
					done();
				});
		});
		it('should not create a flair with missing name, color, or assigned topic', done => {
			Flair.create({
				name: 'Caliente'
			})
				.then(flair => {
					done();
				})
				.catch(err => {
					expect(err.message).toContain('Flair.color cannot be null');
					expect(err.message).toContain('Flair.topicId cannot be null');
					done();
				});
		});
	});
	describe('#setTopic()', () => {
		it('should associate a topic and a flair together', done => {
			// #1
			Topic.create({
				title: 'Test Topic 2',
				description: 'Hope this continues to work'
			}).then(newTopic => {
				// #2
				expect(this.flair.topicId).toBe(this.topic.id);
				// #3
				this.flair.setTopic(newTopic).then(flair => {
					// #4
					expect(flair.topicId).toBe(newTopic.id);
					done();
				});
			});
		});
	});
	describe('#getTopic()', () => {
		it('should return the associated topic', done => {
			this.flair.getTopic().then(associatedTopic => {
				expect(associatedTopic.title).toBe('Hockey');
				done();
			});
		});
	});
});
