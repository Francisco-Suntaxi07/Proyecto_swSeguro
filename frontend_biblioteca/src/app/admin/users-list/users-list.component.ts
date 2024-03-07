import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  formSearch: FormGroup;
  usuarios: any[] = [];
  usuarioEncontrado: any = null;

  constructor(private fb: FormBuilder, private userService: UsersService) {
    this.formSearch = this.fb.group({
      id: ['']
    });

    this.obtenerTodos();  
  }

  buscar(): void {
    const userId = this.formSearch.get('id')?.value;

    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (response) => {
          this.usuarioEncontrado = response.usuario;  
        },
        (error) => {
          console.error('Error al buscar usuario', error);
          this.usuarioEncontrado = null;
        
        }
      );
    } else {
      this.usuarioEncontrado = null;
    }
  }

  obtenerTodos(): void {
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.usuarios = response.usuarios;  
      },
      (error) => {
        console.error('Error al obtener usuarios', error);
    
      }
    );
  }


  deshabilitarSimbolos(event: KeyboardEvent) {
    const charCode = event.which || event.keyCode;
    const specialChars = [33, 64, 35, 36, 37, 94, 38, 42, 40, 41, 95, 43, 61, 91, 93, 123, 125, 92, 124, 59, 58, 34, 39, 60, 62, 47, 63];    if (specialChars.includes(charCode) && charCode !== 38) {
        event.preventDefault();
    }
}



}
