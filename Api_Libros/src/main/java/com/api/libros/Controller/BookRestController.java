package com.api.libros.Controller;

import com.api.libros.Model.Entity.BookEntity;
import com.api.libros.Service.IBookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class BookRestController {

    @Autowired
    private IBookService bookService;

    @GetMapping("/books/all")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<List<BookEntity>> findAllBooks (){
        return ResponseEntity.ok().body(bookService.findAllBooks());
    }

    @GetMapping("/books/{id}")
    public ResponseEntity<?> findBookById(@PathVariable String id) {
        Optional<BookEntity> response = bookService.findBookById(id);
        if (response.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response.get());
    }



    @PostMapping("/books/save")
    public ResponseEntity<?> saveBook(@Valid @RequestBody BookEntity book, BindingResult result){
        if(result.hasErrors()) {
            return this.validar(result);
        }
        BookEntity response = bookService.saveBook(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/books/delete/{id}")
    public ResponseEntity<?> deleteBookById(@PathVariable String id){
        boolean response = bookService.deleteBookById(id);
        if(response) {
            return ResponseEntity.status(HttpStatus.OK).body(true);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
    }


    protected ResponseEntity<?> validar(BindingResult result){
        Map<String, Object> errores = new HashMap<>();
        result.getFieldErrors().forEach(err -> {
            errores.put(err.getField(),"El campo "+err.getField()+" "+err.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errores);
    }

}
