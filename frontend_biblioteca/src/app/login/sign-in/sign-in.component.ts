import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  mensajeError: string = '';  

  _hide = true;

  private _formLogin: FormGroup = this._formBuilder.group({
    idUser: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<SignInComponent>,
    private _formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ){}

  signIn(user: string): void {
    this.router.navigate([user]);
    this.closeSignIn();
  }

  loadSession(): void {
    const id = this._formLogin.value.idUser;
    const contrasenia = this._formLogin.value.password;
    this.usersService.autenticacion(id, contrasenia).subscribe(
      (response) => {
        console.log(response);
        if (response.mensaje === 'Contraseña correcta') {
          const rol = response.rol;
          switch (rol) {
            case 'estudiante':
              this.router.navigate(['/estudiante']);
              break;
            case 'administrador':
              this.router.navigate(['/administrador']);
              break;
            case 'superadmin':
              this.router.navigate(['/admin']);
              break;
            default:
              break;
          }  
          this.dialogRef.close(); 
        } else {
          this.mensajeError = response.mensaje;
        }
      },
      (error) => {
        console.error(error);
        if (error.status === 401) {
          this.mensajeError = 'Credenciales incorrectas. Inténtalo de nuevo.';
        } else if (error.status === 404) {
          this.mensajeError = 'Usuario no encontrado. Verifica el ID ingresado.';
        } else {
          this.mensajeError = 'Error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.';
        }
      }
    );
  }

  closeSignIn(): void {
    this.dialogRef.close();
  }

  public get formLogin(): FormGroup {
    return this._formLogin;
  }

}
