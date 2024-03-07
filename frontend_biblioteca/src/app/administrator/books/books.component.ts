import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookModel } from 'src/app/models/bookModel';
import { BooksService } from 'src/app/services/books.service';
import { BooksFormComponent } from './books-form/books-form.component';
import { BooksWarningComponent } from './books-warning/books-warning.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit{
  
  private _listBooks: BookModel[] = [];
  displayedColumns: string[] = ['id', 'title', 'author', 'genre', 'publisher', 'publicationDate', 'numPages', 'quantity', 'price', 'actions'];
  dataSource: BookModel[] = [];

  constructor(
    public dialog: MatDialog,
    private booksService: BooksService,
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

  openForm(book: BookModel): void {
    const dialogRef = this.dialog.open(BooksFormComponent, {
      data: book
    });
    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }

  openDelete(book: BookModel): void {
    const dialogRef = this.dialog.open(BooksWarningComponent, {
      data: book 
    });
    dialogRef.afterClosed().subscribe( () => {
      location.reload();
    });
  }

}
