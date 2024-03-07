import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoanModel } from 'src/app/models/loanModel';
import { LoansService } from 'src/app/services/loans.service';
import { LoansFormComponent } from './loans-form/loans-form.component';
import { LoansWarningComponent } from './loans-warning/loans-warning.component';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit{

  private _listLoans: LoanModel[] = []
  displayedColumns: string[] = ['id', 'bookId', 'customerId', 'loanDate', 'returnDate', 'price', 'fine', 'observations', 'actions'];
  dataSource: LoanModel[] = [];

  constructor(
    private loansService: LoansService,
    public dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(){
    this.loansService.findAll().subscribe( data => {
      this._listLoans = data;
      this.dataSource = this._listLoans
    });
  }

  openForm(loan: LoanModel): void {
    const dialogRef = this.dialog.open(LoansFormComponent, {
      data: loan
    });
    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }

  openDelete(loan: LoanModel): void {
    const dialogRef = this.dialog.open(LoansWarningComponent, {
      data: loan 
    });
    dialogRef.afterClosed().subscribe( () => {
      location.reload();
    });
  }

}
