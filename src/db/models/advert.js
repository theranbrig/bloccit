'use strict';
module.exports = (sequelize, DataTypes) => {
	var Advert = sequelize.define(
		'Advert',
		{
			title: DataTypes.STRING,
			description: DataTypes.STRING,
			topicId: {
				type: DataTypes.INTEGER,
				onDelete: 'CASCADE',
				references: {
					model: 'Topics',
					key: 'id',
					as: 'topicId'
				}
			}
		},
		{}
	);
	Advert.associate = function(models) {
		Advert.belongsTo(models.Topic, {
			foreignKey: 'topicId',
			onDelete: 'CASCADE'
		});
	};
	return Advert;
};
