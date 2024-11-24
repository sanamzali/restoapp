import { Router } from 'express';
import {
  createCompany,
  deleteCompany,
  getCompanies,
  getCompany,
  updateCompany,
} from '../handlers/companies.handler';
import validationMiddleware from '../middlewares/validation.middleware';
import { createCompanyDto, updateCompanyDto } from '../types/companies.types';

const router = Router();

router.get('/', getCompanies);
router.get('/:id', getCompany);
router.post('/', validationMiddleware(createCompanyDto), createCompany);
router.put('/:id', validationMiddleware(updateCompanyDto), updateCompany);
router.delete('/:id', deleteCompany);

export default router;
