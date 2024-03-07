import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersModel } from 'src/app/models/usersModel';
import { MatSelectModule } from '@angular/material/select';

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
      id: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]*$/)]], 
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(32)]],
      apellido: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(32)]],
      cedula: ['', [Validators.required, Validators.maxLength(10),Validators.pattern('[0-9]*')]],
      rol: ['', Validators.required],
      usuario: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.maxLength(32)]],
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

  isFormValid(): boolean {
    return this.formLogin.valid;
  }
  validarTecla(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode);
    const pattern = /[A-Za-z\s]/;
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  deshabilitarSimbolos(event: KeyboardEvent) {
    const charCode = event.which || event.keyCode;
    const specialChars = [33, 64, 35, 36, 37, 94, 38, 42, 40, 41, 95, 43, 61, 91, 93, 123, 125, 92, 124, 59, 58, 34, 39, 60, 62, 47, 63];
    if (specialChars.includes(charCode)) {
        event.preventDefault();
    }
}

deshabilitarLetras(event: KeyboardEvent) {
  const charCode = event.which || event.keyCode;
  const validChars = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
  if (!validChars.includes(charCode)) {
      event.preventDefault();
  }
}

}
