import { Request, Response } from 'express';
import branchModel from '../models/branch.model';
import { NotFoundError } from '../errors/not-found.error';
import companyModel from '../models/company.model';
import { ForbiddenError } from '../errors/forbidden.error';
import { BadRequestError } from '../errors/bad-request.error';
import { hasBranchPermission } from '../services/permissions.service';

export const getBranches = async (req: Request, res: Response) => {
  const { companyId } = req.query;

  if (!companyId) {
    throw new BadRequestError('CompanyId missing!');
  }

  const company = await companyModel.findOne({ _id: companyId });

  if (!company) {
    throw new NotFoundError('Company not found!');
  }

  if (company.account.toString() !== req.user?.account) {
    throw new ForbiddenError();
  }

  const branches = await branchModel
    .find({ company: company?._id })
    .populate('company');

  res.json(branches);
};

export const getBranch = async (req: Request, res: Response) => {
  const { id } = req.params;

  await hasBranchPermission(id, req.user);

  const branch = await branchModel.findById(id).populate('company');

  res.json(branch);
};

export const createBranch = async (req: Request, res: Response) => {
  const company = await companyModel.findById(req.body.company);

  if (!company) {
    throw new NotFoundError('Company not found!');
  }

  if (company.account.toString() !== req.user?.account) {
    throw new ForbiddenError();
  }

  const branch = await branchModel.create({
    ...req.body,
    createdBy: req.user?._id,
  });

  res.json(branch);
};

export const updateBranch = async (req: Request, res: Response) => {
  const { id } = req.params;

  await hasBranchPermission(id, req.user);

  const updatedBranch = await branchModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.json(updatedBranch);
};

export const deleteBranch = async (req: Request, res: Response) => {
  const { id } = req.params;

  await hasBranchPermission(id, req.user);

  const deletedBranch = await branchModel.findByIdAndDelete(id);

  res.json(deletedBranch);
};
