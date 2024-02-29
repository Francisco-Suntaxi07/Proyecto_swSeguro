import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  constructor(
    public dialogRef: MatDialogRef<SignInComponent>,
    private router: Router
  ){}

  signIn(user: string): void {
    this.router.navigate([user]);
  }

  closeSignIn(): void {
    this.dialogRef.close();
  }

}
