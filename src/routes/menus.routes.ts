import { Router } from 'express';
import {
  createMenu,
  getMenus,
  createSection,
  getSectionById,
  updateSection,
  deleteSection,
  getMenu,
} from '../handlers/menus.handler';
import validationMiddleware from '../middlewares/validation.middleware';
import { createMenuDto } from '../types/menus.types';

const router = Router();

//menu endpoints
router.post('/', validationMiddleware(createMenuDto), createMenu);
router.get('/', getMenus);
router.get('/:id', getMenu);

//section endpoints
router.post('/:id/section', createSection);
router.get('/:id/section/:sectionId', getSectionById);
router.put('/:id/section/:sectionId', updateSection);
router.delete('/:id/section/:sectionId', deleteSection);

export default router;
