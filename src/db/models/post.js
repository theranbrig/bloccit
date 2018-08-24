'use strict';
module.exports = (sequelize, DataTypes) => {
	var Post = sequelize.define(
		'Post',
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false
			},
			body: {
				type: DataTypes.STRING,
				allowNull: false
			},
			topicId: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false
			}
		},
		{}
	);
	Post.associate = function(models) {
		Post.belongsTo(models.Topic, {
			foreignKey: 'topicId',
			onDelete: 'CASCADE'
		});
		Post.belongsTo(models.User, {
			foreignKey: 'userId',
			onDelete: 'CASCADE'
		});
		Post.hasMany(models.Comment, {
			foreignKey: 'postId',
			as: 'comments'
		});
		Post.hasMany(models.Vote, {
			foreignKey: 'postId',
			as: 'votes'
		});
	};

	Post.prototype.getPoints = function() {
		if (this.votes.length === 0) return 0;
		return this.votes
			.map(v => {
				return v.value;
			})
			.reduce((prev, next) => {
				return prev + next;
			});
	};
	Post.prototype.hasUpvoteFor = function(chosenUserId) {
		if (!this.vote) return false;
		this.votes
			.findOne({
				where: {
					userId: chosenUserId,
					value: 1
				}
			})
			.then(newVote => {
				if (newVote) {
					return true;
				}
			});
	};

	Post.prototype.hasDownvoteFor = function(chosenUserId) {
		if (!this.vote) return false;
		this.votes
			.findOne({
				where: {
					userId: chosenUserId,
					value: -1
				}
			})
			.then(newVote => {
				if (newVote) {
					return true;
				}
			});
	};

	Post.prototype.hasUpvoteFor = function(userId, vote) {
		if (vote.userId === userId && vote.value === 1) return true;
	};

	Post.prototype.hasDownvoteFor = function(userId, vote) {
		if (vote.userId === userId && vote.value === -1) return true;
	};

	return Post;
};
