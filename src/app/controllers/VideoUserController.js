import Video from '../models/Video';
import User from '../models/User';
import File from '../models/File';
import Comment from '../models/Comment';

class VideoUserController {
  async index(req, res) {
    const videos = await Video.findAll({
      where: { user_id: req.userId },
      include: [
        {
          model: File,
          as: 'file_video',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: File,
          as: 'thumbnail',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: Comment,
          as: 'comments',
          attributes: ['id', 'content'],
          include: [
            {
              model: User,
              as: 'usercomment',
              attributes: ['id', 'name'],
              include: [
                {
                  model: File,
                  as: 'avatar',
                  attributes: ['id', 'path', 'url'],
                },
              ],
            },
          ],
        },
      ],
    });

    return res.json(videos);
  }
}

export default new VideoUserController();
