import { Request, Response } from 'express';
import companyModel from '../models/company.model';
import { BadRequestError } from '../errors/bad-request.error';
import { NotFoundError } from '../errors/not-found.error';

export const createCompany = async (req: Request, res: Response) => {
  const exists = await companyModel.findOne({ email: req.body.email });

  if (exists) {
    throw new BadRequestError('Company email exists!');
  }

  const company = await companyModel.create({
    ...req.body,
    user: req.user?._id,
    account: req.user?.account,
  });

  res.json(company);
};

export const getCompanies = async (req: Request, res: Response) => {
  const companies = await companyModel
    .find({ account: req.user?.account })
    .populate({
      path: 'user',
      select: '_id email firstName lastName account',
    });

  res.json(companies);
};

export const getCompany = async (req: Request, res: Response) => {
  const { id } = req.params;

  const company = await companyModel.findOne({
    _id: id,
    account: req.user?.account,
  });

  if (!company) {
    throw new NotFoundError('Company not found!');
  }

  res.json(company);
};

export const updateCompany = async (req: Request, res: Response) => {
  const { id } = req.params;

  const company = await companyModel.findOneAndUpdate(
    {
      _id: id,
      account: req.user?.account,
    },
    req.body,
    {
      new: true,
    }
  );

  if (!company) {
    throw new NotFoundError('Company not found!');
  }

  res.json(company);
};

export const deleteCompany = async (req: Request, res: Response) => {
  const { id } = req.params;

  const company = await companyModel.findOneAndDelete({
    _id: id,
    account: req.user?.account,
  });

  if (!company) {
    throw new NotFoundError('Company not found!');
  }

  res.json(company);
};
