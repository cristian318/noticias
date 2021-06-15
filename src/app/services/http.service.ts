import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  makeGet(
    endpoint: string,
    params: HttpParams = new HttpParams(),
    headers: HttpHeaders = this.getDefaultHeaders()
  ): Observable<any> {
    return this.http.get(environment.apiUrl + endpoint, { headers, params });
  }

  makePost(endpoint: string, data: any): Observable<any> {
    return this.http.post(environment.apiUrl + endpoint, data);
  }
  getDefaultHeaders(): HttpHeaders {
    return new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Origin', '*')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET');
  }

  postDefaultHeaders(): HttpHeaders {
    return new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Origin', '*')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'POST');
  }
}
