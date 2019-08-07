import * as Yup from 'yup';
import Product from '../models/Product';

class ProductController {
  async index(req, res) {
    const products = await Product.findAll({
      attributes: ['id', 'code', 'price', 'description', 'name'],
    });

    if (!products) {
      return res.status(401).json({ error: 'Product not found' });
    }

    return res.json(products);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      code: Yup.number().required(),
      name: Yup.string().required(),
      price: Yup.number(),
      description: Yup.string(),
    });

    // if body not valid according the schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data input' });
    }

    const productExists = await Product.findOne({
      where: { code: req.body.code },
    });

    if (productExists) {
      res.status(400).json({ error: 'Product already exists with this code ' });
    }

    await Product.create(req.body);

    return res.json();
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      code: Yup.number().required(),
      name: Yup.string(),
      price: Yup.number(),
      description: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Invalid product' });
    }

    const { name, price, description } = req.body;

    const product = await Product.findOne({ where: { code: req.body.code } });

    if (!product) {
      return res.status(401).json({ error: 'Product code not found ' });
    }

    await product.update({ name, price, description });

    return res.json(product);
  }
}

export default new ProductController();
