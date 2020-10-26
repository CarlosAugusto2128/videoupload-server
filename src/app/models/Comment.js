import Sequelize, { Model } from 'sequelize';

class Comment extends Model {
  static init(sequelize) {
    super.init(
      {
        content: Sequelize.TEXT,
        user_id: Sequelize.INTEGER,
        video_id: Sequelize.INTEGER,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'usercomment' });
    this.belongsTo(models.Video, {
      foreignKey: 'video_id',
      as: 'videocomment',
    });
  }
}

export default Comment;
