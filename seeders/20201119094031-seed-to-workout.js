'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Workouts', [
      {
        name: 'White Cycling',
        video: 'https://www.youtube.com/embed/5Zj80GjJNHM',
        picture: 'https://i.ytimg.com/vi/xgPe-IebRZk/maxresdefault.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Latin Dance',
        video: 'https://www.youtube.com/embed/y9raJrc-X9k',
        picture: 'https://i.ytimg.com/vi/y9raJrc-X9k/maxresdefault.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Barbel Lunge',
        video: 'https://www.youtube.com/embed/rXwys5oW2Ew',
        picture: 'https://healthyeah1014.files.wordpress.com/2015/07/1231.jpg?w=557&h=413',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pilates',
        video: 'https://www.youtube.com/embed/DVJi4q22PRE',
        picture: 'https://i.ytimg.com/vi/aN8DN9ooaeY/maxresdefault.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
   ], {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Workouts', null, {})
  }
};
