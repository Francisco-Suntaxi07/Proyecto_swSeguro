package com.api.libros.Model.Repository;

import com.api.libros.Model.Entity.BookEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBookRepository extends CrudRepository<BookEntity,String> {
}
