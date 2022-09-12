import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import UpdateAnUsersService from "../../services/users/updateAnUser.service";

const UpdateAnUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;

    const UpdatedUser = await UpdateAnUsersService(id, data);

    return res.status(200).json(UpdatedUser);
  } catch (error: any) {
    handleError(error, res);
  }
};

export default UpdateAnUserController;
