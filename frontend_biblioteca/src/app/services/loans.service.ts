import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoanModel } from '../models/loanModel';

@Injectable({
  providedIn: 'root'
})
export class LoansService {

  private urlEndPoint: string = 'http://localhost:8020/api/loans';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<LoanModel[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:admin')
    });
    return this.http.get<LoanModel[]>(`${this.urlEndPoint}/all`, { headers });
  }

  findById(id: string): Observable<LoanModel> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:admin')
    });
    return this.http.get<LoanModel>(`${this.urlEndPoint}/${id}`, { headers });
  }

  save(loan: LoanModel): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:admin')
    });
    return this.http.post<any>(`${this.urlEndPoint}/save`, loan, { headers });
  }

  delete(id?: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:admin')
    });
    return this.http.delete<any>(`${this.urlEndPoint}/delete/${id}`, { headers });
  }

}
