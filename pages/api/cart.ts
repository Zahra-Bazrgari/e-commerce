import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  maxQuantity: number;
  thumbnail: string;
}

interface CartData {
  items: CartItem[];
  totalItems: number;
  totalQuantity: number;
  totalPrice: number;
}

const getFilePath = (): string => path.join(process.cwd(), 'data', 'cart.json');

const readCartData = (): CartData => {
  const filePath = getFilePath();
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data) as CartData;
};

const writeCartData = (data: CartData): void => {
  const filePath = getFilePath();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const updateCartTotals = (cartData: CartData): CartData => {
  const totalItems = cartData.items.length;
  const totalQuantity = cartData.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return { ...cartData, totalItems, totalQuantity, totalPrice };
};

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  const method = req.method;

  switch (method) {
    case 'GET': {
      try {
        let cartData = readCartData();
        cartData = updateCartTotals(cartData);

        res.status(200).json(cartData);
      } catch (error) {
        console.error('Error reading cart data:', error);
        res.status(500).json({ error: 'Failed to read cart data' });
      }
      break;
    }

    case 'POST': {
      try {
        const { _id, name, price, quantity, maxQuantity, thumbnail } = req.body;

        if (
          typeof _id !== 'string' ||
          typeof name !== 'string' ||
          typeof price !== 'number' ||
          typeof quantity !== 'number' ||
          typeof maxQuantity !== 'number' ||
          typeof thumbnail !== 'string'
        ) {
          return res.status(400).json({ error: 'Invalid item data types' });
        }

        let cartData = readCartData();
        const existingItem = cartData.items.find((item) => item._id === _id);

        if (existingItem) {
          return res.status(409).json({ error: 'Item with the same ID already exists' });
        }

        cartData.items.push({ _id, name, price, quantity, maxQuantity, thumbnail });
        cartData = updateCartTotals(cartData);
        writeCartData(cartData);

        res.status(201).json({ message: 'Item added to cart', cart: cartData });
      } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'Failed to add item to cart' });
      }
      break;
    }

    case 'PATCH': {
      try {
        const { _id, quantity } = req.body;

        if (typeof _id !== 'string' || typeof quantity !== 'number') {
          return res.status(400).json({ error: 'Invalid update data' });
        }

        let cartData = readCartData();
        const item = cartData.items.find((item) => item._id === _id);

        if (!item) {
          return res.status(404).json({ error: 'Item not found' });
        }

        if (quantity < 1 || quantity > item.maxQuantity) {
          return res.status(400).json({ error: 'Invalid quantity value' });
        }

        item.quantity = quantity;
        cartData = updateCartTotals(cartData);
        writeCartData(cartData);

        res.status(200).json({ message: 'Item updated', cart: cartData });
      } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ error: 'Failed to update item' });
      }
      break;
    }

    case 'DELETE': {
      try {
        const { _id, clearAll } = req.body;

        let cartData = readCartData();

        if (clearAll) {
          cartData.items = [];
          cartData = updateCartTotals(cartData);
          writeCartData(cartData);

          return res.status(200).json({ message: 'All items removed from cart', cart: cartData });
        }

        if (!_id) {
          return res.status(400).json({ error: 'Item ID is required' });
        }

        const initialLength = cartData.items.length;
        cartData.items = cartData.items.filter((item) => item._id !== _id);

        if (cartData.items.length === initialLength) {
          return res.status(404).json({ error: 'Item not found' });
        }

        cartData = updateCartTotals(cartData);
        writeCartData(cartData);

        res.status(200).json({ message: 'Item removed from cart', cart: cartData });
      } catch (error) {
        console.error('Error removing item(s):', error);
        res.status(500).json({ error: 'Failed to remove item(s) from cart' });
      }
      break;
    }

    default: {
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
}
