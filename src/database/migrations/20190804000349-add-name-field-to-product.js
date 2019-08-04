module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('products', 'name');
  },
};
