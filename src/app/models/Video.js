import Sequelize, { Model } from 'sequelize';

class Video extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.TEXT,
        user_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.File, { foreignKey: 'file_id', as: 'file_video' });
    this.belongsTo(models.File, { foreignKey: 'thumb_id', as: 'thumbnail' });
    this.hasMany(models.Comment, { foreignKey: 'video_id', as: 'comments' });
  }
}

export default Video;
