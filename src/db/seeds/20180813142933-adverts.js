'use strict';

const faker = require('faker');

let adverts = [];

for (let i = 0; i < 15; i++) {
	adverts.push({
		title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
		description: faker.hacker.phrase(),
		createdAt: new Date(),
		updatedAt: new Date()
	});
}

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Adverts', adverts, {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Adverts', null, {});
	}
};
