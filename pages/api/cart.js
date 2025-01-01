import fs from 'fs';
import path from 'path';

const getFilePath = () => path.join(process.cwd(), 'data', 'cart.json');

const readCartData = () => {
  const filePath = getFilePath();
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

const writeCartData = (data) => {
  const filePath = getFilePath();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export default function handler(req, res) {
  const method = req.method;

  switch (method) {
    case 'GET':
      try {
        const cartData = readCartData();
        res.status(200).json(cartData);
      } catch (error) {
        res.status(500).json({ error: 'Failed to read cart data' });
      }
      break;

    case 'POST':
      try {
        const { id, name, price, quantity } = req.body;
        if (!id || !name || !price || quantity === undefined) {
          return res.status(400).json({ error: 'Invalid item data' });
        }

        const cartData = readCartData();
        cartData.items.push({ id, name, price, quantity });
        writeCartData(cartData);

        res.status(201).json({ message: 'Item added to cart', item: { id, name, price, quantity } });
      } catch (error) {
        res.status(500).json({ error: 'Failed to add item to cart' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;
        if (!id) {
          return res.status(400).json({ error: 'Item ID is required' });
        }

        const cartData = readCartData();
        cartData.items = cartData.items.filter((item) => item.id !== id);
        writeCartData(cartData);

        res.status(200).json({ message: 'Item removed from cart' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to remove item from cart' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
