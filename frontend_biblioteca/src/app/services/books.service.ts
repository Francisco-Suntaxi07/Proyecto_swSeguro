import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookModel } from '../models/bookModel';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private urlEndPoint: string = 'http://localhost:8010/api/books';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<BookModel[]>{
    return this.http.get<BookModel[]>(`${this.urlEndPoint}/all`);
  }

  findById(id: string): Observable<BookModel> {
    return this.http.get<BookModel>(`${this.urlEndPoint}/${id}`);
  }

  save(book: BookModel): Observable<any> {
    return this.http.post<any>(`${this.urlEndPoint}/save`, book);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint}/delete/${id}`);
  }

}
