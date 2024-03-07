import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoanModel } from 'src/app/models/loanModel';
import { LoansService } from 'src/app/services/loans.service';

@Component({
  selector: 'app-loans-warning',
  templateUrl: './loans-warning.component.html',
  styleUrls: ['./loans-warning.component.scss']
})
export class LoansWarningComponent {

  private _loan: LoanModel = new LoanModel();

  constructor(
    public dialogRef: MatDialogRef<LoansWarningComponent>,
    private loansService: LoansService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: LoanModel
  ) { 
    this._loan = data;
  }

  closeLoanWarning(): void {
    this.dialogRef.close();
  }

  deleteLoan() {
    this.loansService.delete(this._loan.id).subscribe({
      next: () => {
        this.snackBar.open("✅ El prestamo se elimino correctamente", "Cerrar", {
          duration: 2000
        });
      },
      error: (error) => {
        this.snackBar.open("❌ Ocurrió un error al eliminar el prestamo", "Cerrar", {
          duration: 2000
        });
        console.log(error);
      }
    });
  }

  public get loan(): LoanModel {
    return this._loan;
  }

}
