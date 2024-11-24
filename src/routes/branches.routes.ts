import { Router } from 'express';
import {
  createBranch,
  deleteBranch,
  getBranch,
  getBranches,
  updateBranch,
} from '../handlers/branches.handlers';
import validationMiddleware from '../middlewares/validation.middleware';
import { createBranchDto, updateBranchDto } from '../types/branch.types';
const router = Router();
router.get('/', getBranches);
router.get('/:id', getBranch);
router.post('/', validationMiddleware(createBranchDto), createBranch);
router.put('/:id', validationMiddleware(updateBranchDto), updateBranch);
router.delete('/:id', deleteBranch);
export default router;
