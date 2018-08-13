'use strict';

const faker = require('faker');

let topics = [];

for (let i = 0; i < 15; i++) {
	topics.push({
		title: `${faker.hacker.adjective()} ${faker.hacker.ingverb()} ${faker.hacker.noun()}`,
		description: faker.hacker.phrase(),
		createdAt: new Date(),
		updatedAt: new Date()
	});
}

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Topics', topics, {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Topics', null, {});
	}
};
