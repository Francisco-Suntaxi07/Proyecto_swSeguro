import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.scss']
})
export class BooksFormComponent {

  private _formBook: FormGroup = this._formBuilder.group({
    idUser: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<BooksFormComponent>,
    private _formBuilder: FormBuilder,
  ){}

  closeBookForm(): void {
    this.dialogRef.close();
  }
  
  public get formBook(): FormGroup {
    return this._formBook;
  }
}
