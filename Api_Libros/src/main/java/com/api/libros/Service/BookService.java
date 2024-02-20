package com.api.libros.Service;

import com.api.libros.Model.Entity.BookEntity;
import com.api.libros.Model.Repository.IBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookService implements IBookService{

    @Autowired
    private IBookRepository bookRepository;

    @Override
    public List<BookEntity> findAllBooks() {
        return (ArrayList<BookEntity>) bookRepository.findAll();
    }

    @Override
    public Optional<BookEntity> findBookById(String id) {
        return bookRepository.findById(id);
    }

    @Override
    public BookEntity saveBook(BookEntity book) {
        return bookRepository.save(book);
    }

    @Override
    public boolean deleteBookById(String id) {
        try {
            bookRepository.deleteById(id);
            return true;
        }catch(Exception e){
            System.out.println("ERROR: Revise la api de libros: " + e.getMessage());
            return false;
        }
    }
}
