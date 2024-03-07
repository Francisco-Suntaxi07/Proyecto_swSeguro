import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookModel } from 'src/app/models/bookModel';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.scss']
})
export class BooksFormComponent implements OnInit {

  private _book: BookModel = new BookModel;
  maxDate = new Date();

  private _formBook: FormGroup = this._formBuilder.group({
    id: ['', Validators.required],
    title: ['', [Validators.required, Validators.maxLength(32), Validators.pattern(/^[^<>]*$/)]],
    author: ['', [Validators.required, Validators.maxLength(32), Validators.pattern(/^[^<>]*$/)]],
    genre: ['', [Validators.required, Validators.maxLength(32), Validators.pattern(/^[^<>]*$/)]],
    publisher: ['', [Validators.required, Validators.maxLength(32), Validators.pattern(/^[^<>]*$/)]],
    publicationDate: [null, Validators.required],
    numPages: [null, [Validators.required, Validators.pattern("^[1-9]*$")]],
    quantity: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
    price: [null, [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]]
  });
  
  constructor(
    public dialogRef: MatDialogRef<BooksFormComponent>,
    private _formBuilder: FormBuilder,
    private booksService: BooksService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: BookModel
  ) {
    this._book = data;
  }

  ngOnInit(): void {
    if (this._book) {
      this._formBook.patchValue({
        id: this._book.id,
        title: this._book.title,
        author: this._book.author,
        genre: this._book.genre,
        publisher: this._book.publisher,
        publicationDate: this._book.publicationDate,
        numPages: this._book.numPages,
        status: this._book.status,
        quantity: this._book.quantity,
        price: this._book.price
      });
    }
    if (this._formBook.get('id')?.value) {
      this._formBook.get('id')?.disable();
    }
  }

  isFormValid(): boolean {
    return this._formBook.valid;
  }

  closeBookForm(): void {
    this.dialogRef.close();
  }

  saveBookForm() {
    let book: BookModel = new BookModel();
    try {
      book = this._formBook.value;
      if(this._book != null && (this._book.id != null || this._book.id == "")){
        book.id = this._book.id;
      }
      if(book.quantity! > 0){
        book.status = "disponible"
      } else{
        book.status = "agotado"
      }
      this.booksService.save(book).subscribe({
        next: () => {
          this.snackBar.open("✅ El libro se guardo correctamente", "Cerrar", {
            duration: 2000
          });
        },
        error: (error) => {
          this.snackBar.open("⛔ Ocurrió un error al guardar el libro", "Cerrar", {
            duration: 2000
          });
          console.log(error);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  public get formBook(): FormGroup {
    return this._formBook;
  }
}
