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
}
