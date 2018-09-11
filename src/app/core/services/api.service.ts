import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /**
   * Handle Errors
   * 
   * @param error Error returned from API
   */
  private formatErrors(error: any) {
    return throwError(error.error);
  }

  /**
   * Get resource
   * 
   * @param path Request URL
   * @param params Request parametres
   */
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  /**
   * Update resource
   * 
   * @param path Request URL
   * @param body Request data
   */
  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }

  /**
   * Create new resource
   * 
   * @param path Request URL
   * @param body Request data
   */
  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }

  /**
   * Delete resource
   * 
   * @param path Request URL
   */
  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`
    ).pipe(catchError(this.formatErrors));
  }
}
