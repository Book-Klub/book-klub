import AppDataSource from "../../data-source";
import {AppError} from "../../errors/appError";
import {UsersEntity} from "../../entities/users.entity";
import {UsersClubsEntity} from "../../entities/user_club.entity";

const clubListUsersService = async (id: string) => {
    const usersClubsRepository = AppDataSource.getRepository(UsersClubsEntity)
    const UsersRepository = AppDataSource.getRepository(UsersEntity)

    const usersIds = await usersClubsRepository.find({
        where: {id: id}
    })

    if(!usersIds){
        throw new AppError(400, "There are no users in this club")
    }

    const users: UsersEntity[] = []

    usersIds.forEach(async (item) => {
        const user = await UsersRepository.findOne({
            where: {id: item.user.id}
        })
        if(user){
            users.push(user)
        }
    })
    return users
}

export default clubListUsersService