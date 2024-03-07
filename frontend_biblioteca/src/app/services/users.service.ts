import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { UsersModel } from '../models/usersModel';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private urlEndPoint: string = 'http://127.0.0.1:5000';
  private adminToken: string = 'secreto_admin';

  private userDataSubject: BehaviorSubject<{ id: string, nombre: string, apellido: string, rol: string } | null> =
    new BehaviorSubject<{ id: string, nombre: string, apellido: string, rol: string } | null>(null);

  constructor(private http: HttpClient) { }

  public getUserDataObservable(): Observable<{ id: string, nombre: string, apellido: string, rol: string } | null> {
    return this.userDataSubject.asObservable();
  }

  private setUserData(userData: { id: string, nombre: string, apellido: string, rol: string }): void {
    this.userDataSubject.next(userData);
  }

  public autenticacion(id: string, contrasenia: string): Observable<any> {
    const data = { id: id, contrasenia: contrasenia };

    return this.http.post<any>(`${this.urlEndPoint}/usuarios/verificar`, data)
      .pipe(
        map(response => {
          if (response && response.id && response.nombre && response.apellido && response.rol) {
            const userData = {
              id: response.id,
              nombre: response.nombre,
              apellido: response.apellido,
              rol: response.rol
            };
            this.setUserData(userData);
          } else {
            console.error('La respuesta del servidor no contiene la información del usuario esperada.');
          }
          return response;
        })
      );
  }
  
  public createUser(user: UsersModel): Observable<any> {
    return this.http.post<any>(`${this.urlEndPoint}/usuarios`, user);
  }
  public getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/usuarios/${id}`);
  }
  public deleteUser(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Admin-Token': this.adminToken
    });

    return this.http.delete<any>(`${this.urlEndPoint}/usuarios/${id}`, { headers });
  }
  public getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/usuarios`);
  }
}

