import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'age'],
    });

    if (!users) {
      return res.status(401).json({ error: 'No users found' });
    }

    return res.json(users);
  }

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
    const schema = Yup.object().shape({
      name: Yup.string(),
      age: Yup.number(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Invalid email' });
    }

    const { name } = req.body;
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(401).json({ error: 'Email not found' });
    }

    user.name = name;

    return res.send();
  }
}

export default new UserController();
