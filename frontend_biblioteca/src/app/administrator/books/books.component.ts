import { Component, OnInit } from '@angular/core';
import { BookModel } from 'src/app/models/bookModel';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit{
  
  private _listBooks: BookModel[] = [];
  displayedColumns: string[] = ['id', 'title', 'author', 'genre', 'publisher', 'publicationDate', 'numPages', 'quantity', 'price'];
  dataSource: BookModel[] = [];

  constructor(
    private booksService: BooksService
  ){}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(){
    this.booksService.findAll().subscribe( data => {
      this._listBooks = data;
      this.dataSource = this._listBooks
    });
  }

}
