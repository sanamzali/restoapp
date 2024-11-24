import { Router } from 'express';
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from '../handlers/items.handlers';
import validationMiddleware from '../middlewares/validation.middleware';
import { createItemDto, updateItemDto } from '../types/items.types';

const router = Router();

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/', validationMiddleware(createItemDto), createItem);
router.put('/:id', validationMiddleware(updateItemDto), updateItem);
router.delete('/:id', deleteItem);

export default router;
