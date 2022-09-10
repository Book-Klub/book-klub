import {AppError} from "../../errors/appError";
import AppDataSource from "../../data-source";
import { MeetingsEntity } from "../../entities/meetings.entity";
import { ClubsEntity } from "../../entities/clubs.entity";

const clubsListMeetingsService = async (clubId: string) => {
    const meetingsRepository = AppDataSource.getRepository(MeetingsEntity)
    const clubsRepository = AppDataSource.getRepository(ClubsEntity)

    const clubMeeting= await clubsRepository.findOne({
        where: { id: clubId}
    })

    if (!clubMeeting){
        throw new AppError(404,"Club not Found!")
    }
    
    const meetings = await meetingsRepository.find({
        where : {club : clubMeeting}
    }) 
   
    if(!meetings){
        throw new AppError(404, "There are no Meetings in this club!")
    }

    return meetings
}

export default clubsListMeetingsService