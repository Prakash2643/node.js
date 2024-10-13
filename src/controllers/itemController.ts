import { Request, Response } from 'express';
import { Item } from '../models/Item';

export const createItem = async (req: Request, res: Response) => {
  const newItem = new Item(req.body);
  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: 'Item creation failed' });
  }
};

export const getItems = async (req: Request, res: Response) => {
  const { search, page = 1, limit = 10, sort = 'asc' } = req.query;

  try {
    const items = await Item.find({ name: { $regex: search || '', $options: 'i' } })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ name: sort === 'asc' ? 1 : -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve items' });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: 'Item update failed' });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Item deletion failed' });
  }
};
