import { ForbiddenError } from '../errors/forbidden.error';
import { NotFoundError } from '../errors/not-found.error';
import companyModel from '../models/company.model';
import itemModel from '../models/item.model';
import { Request, Response } from 'express';
import { Maybe } from '../types/common.types';
import { UserPayload } from '../types/users.types';
import { BadRequestError } from '../errors/bad-request.error';

export const getItems = async (req: Request, res: Response) => {
  const { companyId } = req.query;

  if (!companyId) {
    throw new BadRequestError('CompanyId missing!');
  }

  const company = await companyModel.findOne({ _id: companyId });

  if (!company) {
    throw new NotFoundError('company not found!');
  }

  if (company.account.toString() !== req.user?.account) {
    throw new ForbiddenError();
  }

  const items = await itemModel
    .find({ company: company._id })
    .populate('company');

  res.json(items);
};

export const getItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  await hasItemPermission(id, req.user);

  const item = await itemModel.findById(id).populate('company');

  res.json(item);
};

export const createItem = async (req: Request, res: Response) => {
  const company = await companyModel.findById(req.body.company);

  if (!company) {
    throw new NotFoundError('Company not found!');
  }

  if (company.account.toString() !== req.user?.account) {
    throw new ForbiddenError();
  }

  const item = await itemModel.create(req.body);

  res.json(item);
};

export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  await hasItemPermission(id, req.user);

  const updatedItem = await itemModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.json(updatedItem);
};

export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  await hasItemPermission(id, req.user);

  const deletedItem = await itemModel.findByIdAndDelete(id);

  res.json(deletedItem);
};

const hasItemPermission = async (id: String, user: Maybe<UserPayload>) => {
  const item = await itemModel.findById(id);

  if (!item) {
    throw new NotFoundError('branch not found!');
  }

  const company = await companyModel.findById(item?.company);

  if (user?.account !== company?.account.toString()) {
    throw new ForbiddenError();
  }
};
