import { BadRequestError } from '../errors/bad-request.error';
import { ForbiddenError } from '../errors/forbidden.error';
import { NotFoundError } from '../errors/not-found.error';
import branchModel from '../models/branch.model';
import menuModel from '../models/menu.model';
import { Maybe } from '../types/common.types';
import { UserPayload } from '../types/users.types';

export const hasBranchPermission = async (
  id: String,
  user: Maybe<UserPayload>
) => {
  const branch = await branchModel.findById(id).populate('company');

  if (!branch) {
    throw new NotFoundError('Branch does not exit!');
  }

  if (
    typeof branch.company !== 'string' &&
    branch.company.account.toString() !== user?.account
  ) {
    throw new ForbiddenError();
  }
};

export const hasMenuPermission = async (
  id: String,
  user: Maybe<UserPayload>
) => {
  const menu = await menuModel.findById(id).populate('branch');

  if (!menu) {
    throw new NotFoundError('Menu not found!');
  }

  if (typeof menu.branch === 'string' || !menu.branch._id) {
    throw new BadRequestError();
  }

  await hasBranchPermission(menu.branch._id.toString(), user);
};
