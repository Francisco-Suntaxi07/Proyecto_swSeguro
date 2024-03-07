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

  private _loan: LoanModel = new LoanModel;
  minDate = new Date();
  minDateReturn = new Date();

  private _formLoan: FormGroup = this._formBuilder.group({
    id: ['', Validators.required],
    bookId: ['', Validators.required],
    customerId: ['', Validators.required],
    loanDate: [null, Validators.required],
    returnDate: [null, Validators.required],
    price: [null, [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]],
    fine: [null, [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]],
    observations: ['']
  });

  constructor(
    public dialogRef: MatDialogRef<LoansFormComponent>,
    private _formBuilder: FormBuilder,
    private loansService: LoansService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: LoanModel
  ) {
    this._loan = data;
  }

  ngOnInit(): void {
    if (this._loan) {
      this._formLoan.patchValue({
        id: this._loan.id,
        bookId: this._loan.bookId,
        customerId: this._loan.customerId,
        loanDate: this._loan.loanDate,
        returnDate: this._loan.returnDate,
        price: this._loan.price,
        fine: this._loan.fine,
        observations: this._loan.observations
      });
    }
    if (this._formLoan.get('id')?.value) {
      this._formLoan.get('id')?.disable();
    }
  }

  updateMinReturnDate(event: any): void {
    const selectedDate = event.value;
    this.minDateReturn = selectedDate;
  }

  isFormValid(): boolean {
    return this._formLoan.valid;
  }

  closeLoanForm(): void {
    this.dialogRef.close();
  }

  saveBookForm() {
    let loan: LoanModel = new LoanModel();
    try {
      loan = this._formLoan.value;
      if (this._loan != null && (this._loan.id != null || this._loan.id == "")) {
        loan.id = this._loan.id;
      }
      console.log(loan);
      this.loansService.save(loan).subscribe({
        next: () => {
          this.snackBar.open("✅ El prestamo se guardo correctamente", "Cerrar", {
            duration: 2000
          });
        },
        error: (error) => {
          this.snackBar.open("⛔ Ocurrió un error al guardar el prestamo", "Cerrar", {
            duration: 2000
          });
          console.log(error);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  public get formLoan(): FormGroup {
    return this._formLoan;
  }

}
