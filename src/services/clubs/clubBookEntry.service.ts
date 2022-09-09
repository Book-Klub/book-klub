import AppDataSource from "../../data-source";
import { BooksEntity } from "../../entities/books.entity";
import { ClubsEntity } from "../../entities/clubs.entity";
import { ClubBookEntity } from "../../entities/club_book.entity";
import { AppError } from "../../errors/appError";
import { IClubBook } from "../../interfaces/clubs";

const clubBookEntryService = async(data: IClubBook)=>{
    const bookRepository = AppDataSource.getRepository(BooksEntity);
    const clubRepository = AppDataSource.getRepository(ClubsEntity);
    const clubBookRepository = AppDataSource.getRepository(ClubBookEntity);

    const bookAlready = await bookRepository.findBy({id: data.bookId});
    const clubAlready = await clubRepository.findBy({id: data.clubId})

    if(!bookAlready){
        new AppError(400, "Book not found")
    }
    if(!clubAlready){
        new AppError(400, "Club not found")
    }

    const newClubBook = clubBookRepository.create({
        book: bookAlready,
        club: clubAlready
    })

    await clubBookRepository.save(newClubBook)
}

export default clubBookEntryService;