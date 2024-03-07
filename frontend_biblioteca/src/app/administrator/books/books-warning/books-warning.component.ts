import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookModel } from 'src/app/models/bookModel';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books-warning',
  templateUrl: './books-warning.component.html',
  styleUrls: ['./books-warning.component.scss']
})
export class BooksWarningComponent {

  private _book: BookModel = new BookModel;

  constructor(
    public dialogRef: MatDialogRef<BooksWarningComponent>,
    private booksService: BooksService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: BookModel
  ) {
    this._book = data;
  }

  closeBookWarning(): void {
    this.dialogRef.close();
  }

  deleteBook() {
    this.booksService.delete(this._book.id).subscribe({
      next: () => {
        this.snackBar.open("✅ El libro se elimino correctamente", "Cerrar", {
          duration: 2000
        });
      },
      error: (error) => {
        this.snackBar.open("❌ Ocurrió un error al eliminar el libro", "Cerrar", {
          duration: 2000
        });
        console.log(error);
      }
    });
  }

  public get book(): BookModel {
    return this._book;
  }

}
