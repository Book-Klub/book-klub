import AppDataSource from "../../data-source";
import {v4 as uuidv4} from "uuid"
import { BooksEntity } from "../../entities/books.entity";
import { CategoriesEntity } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";
import { IbookRequest } from "../../interfaces/books";

const  createBooksService = async(data: IbookRequest)=>{
    const booksRepository = AppDataSource.getRepository(BooksEntity);
    const categoryRepository = AppDataSource.getRepository(CategoriesEntity);

    if(!data.name){
        throw new AppError(400, "Name is required!")
    };

    if(!data.author){
        throw new AppError(400, "Author is required!")
    };

    if(!data.categoryId){
        throw new AppError(400, "CategoryId is required!")
    };

    const category = await categoryRepository.findOneBy({id: data.categoryId});

    if(!category){
        throw new AppError(400, "Category not found")
    };

    const bookExists = await booksRepository.findOneBy({
        name: data.name,
        author: data.author,
        category: category
    });

    if(bookExists){
        throw new AppError(400, "Book already exists.")
    };

    const newBook = booksRepository.create({
        id: uuidv4(),
        name: data.name,
        author: data.author,
        category: category
    });

    await booksRepository.save(newBook);

    return newBook;
}

export default createBooksService;