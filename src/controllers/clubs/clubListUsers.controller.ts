import {Request, Response} from "express";
import { AppError, handleError } from "../../errors/appError";
import clubListUsersService from "../../services/clubs/clubListUsers.service";

const clubListUsersController = (req: Request, res: Response) => {
    try {
        const clubId = req.params.id

        const users = clubListUsersService(clubId);

        return res.status(200).json(users);
    } catch (error) {
        if (error instanceof AppError){
            handleError(error, res)
        }
    }
}

export default clubListUsersController