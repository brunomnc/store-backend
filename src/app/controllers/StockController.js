import * as Yup from 'yup';
import Product from '../models/Product';

class ProductController {
  async index(req, res) {
    if (req.params.id) {
      const product = await Product.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'amount'],
      });

      if (!product) {
        return res.status(401).json({ error: 'Product not found' });
      }

      return res.json(product);
    }
    const products = await Product.findAll({
      attributes: ['id', 'code', 'price', 'name', 'amount'],
    });

    if (!products) {
      return res.status(401).json({ error: 'Product not found' });
    }
    return res.json(products);
  }

  async store(req, res) {
    return res.send();
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      add: Yup.bool().required(),
      value: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Invalid data' });
    }

    const { id, add, value } = req.body;

    const product = await Product.findOne({ where: { id: req.body.id } });

    if (!product) {
      return res.status(401).json({ error: 'Product ID not found ' });
    }

    if (add) {
      const amount = product.amount + value;

      product.update({ amount });

      return res.json(product);
    }

    if (product.amount - value < 0) {
      return res.status(401).json({ error: 'Invalid amount' });
    }
    const amount = product.amount - value;

    product.update({ amount });

    return res.json(product);
  }
}

export default new ProductController();
