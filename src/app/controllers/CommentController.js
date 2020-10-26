import * as Yup from 'yup';
import Comment from '../models/Comment';
import Video from '../models/Video';
import User from '../models/User';
import Notification from '../schemas/Notification';

class CommentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      content: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { content } = req.body;

    const videoExists = await Video.findOne({
      where: { id },
    });

    if (!videoExists) {
      return res.status(400).json({ error: 'Video already exists' });
    }

    const comment = await Comment.create({
      content,
      user_id: req.userId,
      video_id: id,
    });

    const user = await User.findByPk(req.userId);

    if (comment) {
      if (videoExists.user_id !== user.id) {
        await Notification.create({
          content: `${user.name}, comentou em seu video! `,
          user_id: videoExists.user_id,
        });
      }
    }

    return res.json(comment);
  }
}

export default new CommentController();
