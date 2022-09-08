import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import ListAnUsersService from "../../services/users/ListAnUser.service";

const ListAnUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const User = await ListAnUsersService(id);

    return res.status(200).json(User);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default ListAnUserController;
