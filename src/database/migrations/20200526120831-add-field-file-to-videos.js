module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('videos', 'file_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('videos', 'file_id');
  },
};
