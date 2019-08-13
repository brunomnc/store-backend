module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'amount', {
      defaultValue: 0,
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('products', 'amount');
  },
};
