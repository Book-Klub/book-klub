import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import { handleError } from "../../errors/appError";
import clubBookEntryService from "../../services/clubs/clubBookEntry.service";

const clubBookEntryController = async(req: Request, res: Response)=>{
    try{
        const data = req.body;
        await clubBookEntryService(data)
        res.status(200).json({
            message: "Book added successfully"
        })
    } catch (error) {
        if (error instanceof AppError){
            handleError(error, res)
        }
    }
}

export default clubBookEntryController;