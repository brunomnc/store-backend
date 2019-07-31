import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      age: Yup.number(),
      email: Yup.string()
        .required()
        .email(),
      password: Yup.string()
        .required()
        .min(4),
    });

    // if body not valid according the schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data input' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      res.status(400).json({ error: 'User already exists ' });
    }

    await User.create(req.body);

    return res.json();
  }

  async update(req, res) {
    return res.status(401);
  }
}

export default new UserController();
