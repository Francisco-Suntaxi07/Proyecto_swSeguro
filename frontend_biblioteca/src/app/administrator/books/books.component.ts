import { Component } from '@angular/core';
import { BookModel } from 'src/app/models/bookModel';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  
  /*listBooks: BookModel[] = [];

  constructor(
    private booksService: BooksService
  ){}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(){
    this.booksService.findAll().subscribe( data => {
      this.listBooks = data;
    });
    console.log("HOLA MUNSO")
  }*/

}
