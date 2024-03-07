import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.scss']
})
export class StudentLayoutComponent implements OnInit {

  displayLoans: boolean = false;
  userName: string | null = null;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.subscribeToUserData();
  }

  goToLoans() {
    this.displayLoans = true;
  }

  private subscribeToUserData(): void {
    this.userService.getUserDataObservable().subscribe(userData => {
      if (userData) {
        this.userName = `${userData.nombre} ${userData.apellido}`;
      } else {
        this.userName = null;
      }
    });
  }
}
