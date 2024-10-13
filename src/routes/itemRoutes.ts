import express from 'express';
import { createItem, getItems, updateItem, deleteItem } from '../controllers/itemController';

const router = express.Router();

router.post('/', createItem);             // Create Item
router.get('/', getItems);                 // Get All Items

export default router;
