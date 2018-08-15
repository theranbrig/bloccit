const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require('../../src/db/models').Topic;
const Post = require('../../src/db/models').Post;

describe('Topic', () => {
	beforeEach(done => {
		this.topic;
		sequelize.sync({ force: true }).then(res => {
			Topic.create({
				title: 'New Tupperware',
				description: 'The best ware for your kitchen.'
			})
				.then(topic => {
					this.topic = topic;
					Post.create({
						title: 'New ware for sardines',
						body: 'My fish gets really stinky.  How do I keep it fresh.',
						topicId: this.topic.id
					}).then(post => {
						this.post = post;
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
		it('should create a topic with valid title and description', done => {
			Topic.create({
				title: 'Hockey',
				description: 'Fastest game on Earth.',
				topicId: this.topic.id
			})
				.then(topic => {
					expect(topic.title).toBe('Hockey');
					expect(topic.description).toBe('Fastest game on Earth.');
					done();
				})
				.catch(err => {
					console.log(err);
					done();
				});
		});
		it('should not create a topic with missing title or description', done => {
			Topic.create({
				title: 'The Polka'
			})
				.then(topic => {
					done();
				})
				.catch(err => {
					expect(err.message).toContain('Topic.description cannot be null');
					done();
				});
		});
	});
	describe('#getTopic()', () => {
		it('should return the associated topic', done => {
			this.post.getTopic().then(associatedTopic => {
				expect(associatedTopic.title).toBe('New Tupperware');
				done();
			});
		});
	});
});

// Defining tests for the create and getPosts methods. For the create method, test that when calling Topic.create with valid arguments, that a topic object is created and stored in the database. For getPosts, create and associate a post with the topic in scope. The getPosts method returns an array of Post objects that are associated with the topic the method was called on. The test should confirm that the associated post is returned when that method is called.
