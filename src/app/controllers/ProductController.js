import * as Yup from 'yup';
import Product from '../models/Product';

class ProductController {
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
      name: Yup.str(),
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

    product.name = name;
    product.price = price;
    product.description = description;

    return res.send();
  }
}

export default new ProductController();
