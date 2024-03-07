import { Component, OnInit } from '@angular/core';
import { LoanModel } from 'src/app/models/loanModel';
import { LoansService } from 'src/app/services/loans.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-loans-view',
  templateUrl: './loans-view.component.html',
  styleUrls: ['./loans-view.component.scss']
})
export class LoansViewComponent implements OnInit {

  private _listLoans: LoanModel[] = [];
  displayedColumns: string[] = ['id', 'bookId', 'customerId', 'loanDate', 'returnDate', 'price', 'fine', 'observations'];
  dataSource: LoanModel[] = [];

  constructor(
    private loansService: LoansService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.userService.getUserDataObservable().subscribe(userData => {
      if (userData && userData.id) {
        this.loansService.findAll().subscribe(data => {
          this._listLoans = data.filter(loan => loan.customerId === userData.id);
          this.dataSource = this._listLoans;
        });
      } else {
        console.error('No se pudo obtener el ID del usuario.');
      }
    });
  }
}
