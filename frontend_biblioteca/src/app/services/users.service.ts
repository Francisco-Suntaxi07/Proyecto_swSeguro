import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersModel } from '../models/usersModel';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private urlEndPoint: string = 'http://127.0.0.1:5000';
  private adminToken: string = 'secreto_admin';
  constructor(private http: HttpClient) { }

  
  public autenticacion(id: string, contrasenia: string): Observable<any> {
    const data = { id: id, contrasenia: contrasenia };

    return this.http.post<any>(`${this.urlEndPoint}/usuarios/verificar`, data);
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

