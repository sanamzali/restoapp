import { Request, Response } from 'express';
import { NotFoundError } from '../errors/not-found.error';
import menuModel from '../models/menu.model';
import { BadRequestError } from '../errors/bad-request.error';
import {
  hasBranchPermission,
  hasMenuPermission,
} from '../services/permissions.service';

export const createMenu = async (req: Request, res: Response) => {
  await hasBranchPermission(req.body.branch, req.user);

  const menu = await menuModel.create(req.body);
  res.json(menu);
};

export const getMenus = async (req: Request, res: Response) => {
  const { branchId } = req.query;

  if (!branchId || typeof branchId !== 'string') {
    throw new BadRequestError('BranchId missing!');
  }

  await hasBranchPermission(branchId, req.user);

  const menus = await menuModel
    .find({ branch: branchId })
    .populate('branch')
    .populate('sections.items.item');

  res.json(menus);
};

export const getMenu = async (req: Request, res: Response) => {
  const { id } = req.params;

  await hasMenuPermission(id, req.user);

  const menu = await menuModel
    .findById(id)
    .populate('branch')
    .populate('sections.items.item');

  res.json(menu);
};

export const updateMenu = async (req: Request, res: Response) => {
  const { id } = req.params;

  await hasMenuPermission(id, req.user);

  const updatedMenu = await menuModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.json(updatedMenu);
};

export const deleteMenu = async (req: Request, res: Response) => {
  const { id } = req.params;

  await hasMenuPermission(id, req.user);

  const deletedMenu = await menuModel.findByIdAndDelete(id);

  res.json(deletedMenu);
};

export const createSection = async (req: Request, res: Response) => {
  const { id } = req.params;

  await hasMenuPermission(id, req.user);

  const updatedMenu = await menuModel
    .findByIdAndUpdate(
      id,
      {
        $push: { sections: req.body },
      },
      {
        new: true,
      }
    )
    .populate('branch')
    .populate('sections.items.item');

  if (!updatedMenu) {
    throw new NotFoundError('Menu not found!');
  }

  res.json(updatedMenu);
};

export const getSectionById = async (req: Request, res: Response) => {
  const { id, sectionId } = req.params;

  await hasMenuPermission(id, req.user);

  const menu = await menuModel.findById(id).populate('sections.items.item');

  if (!menu) {
    throw new NotFoundError('Menu not found!');
  }

  const section = menu.sections.find(
    (section) => section._id?.toString() === sectionId
  );

  if (!section) {
    throw new NotFoundError('Section not found!');
  }

  res.json(section);
};

export const updateSection = async (req: Request, res: Response) => {
  const { id, sectionId } = req.params;

  await hasMenuPermission(id, req.user);

  const menu = await menuModel
    .findOneAndUpdate(
      { _id: id, 'sections._id': sectionId },
      { $set: { 'sections.$': req.body } },
      { new: true }
    )
    .populate('sections.items.item');

  if (!menu) {
    throw new NotFoundError('Menu or section not found!');
  }

  const section = menu.sections.find(
    (section) => section._id?.toString() === sectionId
  );

  res.json(section);
};

export const deleteSection = async (req: Request, res: Response) => {
  const { id, sectionId } = req.params;

  await hasMenuPermission(id, req.user);

  const updatedMenu = await menuModel
    .findByIdAndUpdate(
      id,
      {
        $pull: { sections: { _id: sectionId } },
      },
      {
        new: true,
      }
    )
    .populate('branch')
    .populate('sections.items.item');

  if (!updatedMenu) {
    throw new NotFoundError('Menu not found!');
  }

  res.json(updatedMenu);
};
