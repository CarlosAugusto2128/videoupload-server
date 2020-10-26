import * as Yup from 'yup';
import Video from '../models/Video';
import User from '../models/User';
import File from '../models/File';
import Comment from '../models/Comment';

class VideoController {
  async show(req, res) {
    const { id } = req.params;

    const videos = await Video.findAll({
      where: { id },
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
          attributes: ['id', 'content', 'createdAt'],
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

  async index(req, res) {
    const videos = await Video.findAll({
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

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      file_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { id, title, description, file_id, thumb_id } = req.body;

    await Video.create({
      id,
      title,
      description,
      file_id,
      thumb_id,
      user_id: req.userId,
    });

    return res.json({
      id,
      title,
      description,
      file_id,
      thumb_id,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      file_id: Yup.number(),
      thumbnail: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { id } = req.params;

    // const user = await User.findByPk(req.userId);

    const video = await Video.findOne({
      where: { id, user_id: req.userId },
    });

    if (!video) {
      return res.status(401).json({ error: "You don't have permission" });
    }

    await video.update(req.body);

    const { title, description, file_video, thumbnail } = await Video.findOne({
      where: { id },
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
      ],
    });

    return res.json({
      id,
      title,
      description,
      file_video,
      thumbnail,
    });
  }
}

export default new VideoController();
