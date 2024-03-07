import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersModel } from 'src/app/models/usersModel';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-users-delete',
  templateUrl: './users-delete.component.html',
  styleUrls: ['./users-delete.component.scss']
})
export class UsersDeleteComponent {

  formSearch!: FormGroup; 
  resultados: UsersModel[] = [];
  mensajeError: string | null = null; 
  usuarioEncontrado: UsersModel | undefined;
  constructor(
    public dialogRef: MatDialogRef<UsersDeleteComponent>,
    private userService: UsersService,
    private fb: FormBuilder ,
    private snackBar: MatSnackBar 
  ) {
    this.formSearch = this.fb.group({
      id: ['', Validators.required],
    });
  
    this.initializeForm();
  }
  

  initializeForm() {
    this.formSearch = this.fb.group({
      id: ['']
    });
  }

  closeSearch(): void {
    this.dialogRef.close();
  }

  buscar(): void {
    const userId = this.formSearch.get('id')?.value;

  if (userId) {
    this.userService.getUserById(userId).subscribe(
      (response) => {
        this.usuarioEncontrado = response.usuario;  
        this.mensajeError = null;
      },
      (error) => {
        this.mensajeError = 'Usuario no encontrado';
        this.usuarioEncontrado = undefined;
      }
    );
  }
  }

  eliminar(id: string | undefined): void {
    if (id !== undefined) {
      this.userService.deleteUser(id).subscribe(
        response => {
          console.log('Usuario eliminado exitosamente', response);
          this.mensajeError = null;
          this.usuarioEncontrado = undefined;
          this.formSearch.reset();
  
          this.mostrarNotificacion('Usuario eliminado exitosamente');
        },
        error => {
          console.error('Error al eliminar usuario', error);
          this.mensajeError = 'Error al eliminar usuario. Por favor, inténtalo de nuevo.';
  
          this.mostrarNotificacion('Error al eliminar usuario. Por favor, inténtalo de nuevo.');
        }
      );
    } else {
      console.error('ID de usuario no definido');
    }
  }
  
  mostrarNotificacion(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'] 
    });
  }
  
  deshabilitarSimbolos(event: KeyboardEvent) {
    const charCode = event.which || event.keyCode;
    const specialChars = [33, 64, 35, 36, 37, 94, 38, 42, 40, 41, 95, 43, 61, 91, 93, 123, 125, 92, 124, 59, 58, 34, 39, 60, 62, 47, 63];    if (specialChars.includes(charCode) && charCode !== 38) {
        event.preventDefault();
    }
}

  
}
