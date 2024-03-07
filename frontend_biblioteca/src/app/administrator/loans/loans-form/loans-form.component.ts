import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoanModel } from 'src/app/models/loanModel';
import { LoansService } from 'src/app/services/loans.service';

@Component({
  selector: 'app-loans-form',
  templateUrl: './loans-form.component.html',
  styleUrls: ['./loans-form.component.scss']
})
export class LoansFormComponent implements OnInit {

  private _formLoan: FormGroup = this._formBuilder.group({
    id: ['', Validators.required],
    bookId: ['', Validators.required],
    customerId: ['', Validators.required],
    loanDate: [null, Validators.required],
    returnDate: [null, Validators.required],
    price: [null, [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]],
    fine: [null, [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]],
    observations: ['', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<LoansFormComponent>,
    private _formBuilder: FormBuilder,
    private loansService: LoansService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: LoanModel
  ) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public get formLoan(): FormGroup {
    return this._formLoan;
  }


}
