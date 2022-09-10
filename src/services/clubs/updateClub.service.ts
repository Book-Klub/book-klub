import AppDataSource from "../../data-source";
import { ClubsEntity } from "../../entities/clubs.entity";
import { AppError } from "../../errors/appError";


const UpdateClubService = async (id:string, name:string, description:string ,
): Promise<ClubsEntity> => {
  const clubRepository = AppDataSource.getRepository(ClubsEntity);

  await clubRepository.update(id, {
    name,
    description
  });
    
  const club = await clubRepository.findOneBy({ id });

  if (!club) {
    throw new AppError(400, "Club not found");
  }

  return club;
};

export default UpdateClubService;