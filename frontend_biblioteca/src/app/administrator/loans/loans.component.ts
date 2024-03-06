import { Component, OnInit } from '@angular/core';
import { LoanModel } from 'src/app/models/loanModel';
import { LoansService } from 'src/app/services/loans.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit{

  private _listLoans: LoanModel[] = []
  displayedColumns: string[] = ['id', 'bookId', 'customerId', 'loanDate', 'returnDate', 'price', 'fine', 'observations'];
  dataSource: LoanModel[] = [];

  constructor(
    private loansService: LoansService
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

}
