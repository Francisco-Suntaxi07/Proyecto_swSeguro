import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookModel } from '../models/bookModel';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private urlEndPoint: string = 'http://localhost:8010/api/books';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<BookModel[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:admin')
    });
    return this.http.get<BookModel[]>(`${this.urlEndPoint}/all`, { headers });
  }

  findById(id?: string): Observable<BookModel> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:admin')
    });
    return this.http.get<BookModel>(`${this.urlEndPoint}/${id}`, { headers });
  }

  save(book: BookModel): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:admin')
    });
    return this.http.post<any>(`${this.urlEndPoint}/save`, book, { headers });
  }

  delete(id?: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:admin')
    });
    return this.http.delete<any>(`${this.urlEndPoint}/delete/${id}`, { headers });
  }

}
