import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  _hide = true;
  
  private _formLogin: FormGroup = this._formBuilder.group({
    idUser: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<SignInComponent>,
    private _formBuilder: FormBuilder,
    private router: Router
  ){}

  signIn(user: string): void {
    this.router.navigate([user]);
    this.closeSignIn();
  }

  closeSignIn(): void {
    this.dialogRef.close();
  }

  public get formLogin(): FormGroup {
    return this._formLogin;
  }

}
