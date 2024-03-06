import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookModel } from 'src/app/models/bookModel';

@Component({
  selector: 'app-books-warning',
  templateUrl: './books-warning.component.html',
  styleUrls: ['./books-warning.component.scss']
})
export class BooksWarningComponent{

  private _book: BookModel = new BookModel;

  constructor(
    public dialogRef: MatDialogRef<BooksWarningComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BookModel
  ){
    this._book = data;
  }

  closeBookWarning(): void {
    this.dialogRef.close();
  }

  public get book(): BookModel {
    return this._book;
  }
  
}
