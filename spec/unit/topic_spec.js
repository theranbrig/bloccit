const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require('../../src/db/models').Topic;
const Post = require('../../src/db/models').Post;
const User = require('../../src/db/models').User;

describe('Topic', () => {
	beforeEach(done => {
		this.topic;
		this.post;
		this.user;
		sequelize.sync({ force: true }).then(res => {
			User.create({
				email: 'starman@tesla.com',
				password: 'Trekkie4lyfe'
			}).then(user => {
				this.user = user;
				Topic.create(
					{
						title: 'Expeditions to Alpha Centauri',
						description: 'A compilation of reports from recent visits to the star system.',
						posts: [
							{
								title: 'My first visit to Proxima Centauri b',
								body: 'I saw some rocks.',
								userId: this.user.id
							}
						]
					},
					{
						include: {
							model: Post,
							as: 'posts'
						}
					}
				).then(topic => {
					this.topic = topic;
					this.post = topic.posts[0];
					done();
				});
			});
		});
	});

	describe('#create', () => {
		it('should create a topic object and store it in the database', done => {
			Topic.all().then(topics => {
				expect(topics.length).toBe(1);

				Topic.create({
					title: 'Potatoes',
					description: 'Boiled or fried'
				}).then(topic => {
					Topic.all().then(topics => {
						const topicCountAfterCreate = topics.length;
						expect(topicCountAfterCreate).toBe(2);
						expect(topic.title).toBe('Potatoes');
						expect(topic.description).toBe('Boiled or fried');
						done();
					});
				});
			});
		});
	});

	describe('#getPosts', () => {
		it('should return an array of Post objects that are associated with a topic', done => {
			Post.create({
				title: 'Will the hawks win the cup?',
				body: 'Of course.',
				topicId: this.topic.id
			})
				.then(post => {
					expect(post.title).toBe('Will the hawks win the cup?');

					Post.create({
						title: 'The smell of the rink',
						body: 'One of the greatest smells ever',
						topicId: this.topic.id
					}).then(post => {
						expect(post.title).toBe('The smell of the rink');
						this.topic.getPosts().then(posts => {
							expect(posts.length).toBe(2);
							expect(posts[0].body).toBe('Of course.');
							expect(posts[1].body).toBe('One  of the greatest smells ever.');
							done();
						});
					});
				})
				.catch(err => {
					console.log(err);
					done();
				});
		});
	});
});
