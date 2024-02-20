package com.api.libros.Service;

import com.api.libros.Model.Entity.BookEntity;

import java.util.List;
import java.util.Optional;

public interface IBookService {

    public List<BookEntity> findAllBooks();
    public Optional<BookEntity> findBookById(String id);
    public BookEntity saveBook(BookEntity book);
    public boolean deleteBookById(String id);

}
