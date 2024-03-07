import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersModel } from 'src/app/models/usersModel';

@Component({
  selector: 'app-users-forms',
  templateUrl: './users-forms.component.html',
  styleUrls: ['./users-forms.component.scss']
})
export class UsersFormsComponent {
  _hide = true;
  mensajeError: string | null = null;
  formLogin!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UsersFormsComponent>,
    private fb: FormBuilder,
    private userService: UsersService,
    private snackBar: MatSnackBar
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.formLogin = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(100)]],
      apellido: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(100)]],
      cedula: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      rol: ['', Validators.required],
      usuario: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.maxLength(100)]],
      contrasenia: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]],
      correo: ['', [Validators.required, Validators.email]], 
      telefono: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      direccion: ['']
    });
  }
  onSubmit() {
    if (this.formLogin.valid) {
      const user: UsersModel = this.formLogin.value;
      this.userService.createUser(user).subscribe(
        response => {
          console.log('Usuario creado exitosamente', response);
          this.openDialog('Usuario creado exitosamente.');
          this.dialogRef.close();
        },
        error => {
          console.error('Error al crear usuario', error);
          if (error.status === 400 && error.error && error.error.error) {
            this.openDialog(error.error.error);
          } else {
            this.mensajeError = 'Error al crear usuario. Por favor, inténtalo de nuevo.';
          }
        }
      );
    }
  }
  openDialog(message: string, isError: boolean = false): void {
    if (isError) {
      this.snackBar.open(message, 'Cerrar', {
        duration: 3500,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar'] 
      });
    } else {
      this.snackBar.open(message, 'Cerrar', {
        duration: 3500,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['success-snackbar'] 
      });
    }
  }
  closeSignIn(): void {
    this.dialogRef.close();
  }
}
