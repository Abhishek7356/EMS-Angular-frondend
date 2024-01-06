import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  server_url = 'https://ems-angular-backend-wncl.onrender.com'

  constructor(private http: HttpClient) { }

  Authenticate() {
    return this.http.get(`${this.server_url}/users/1`)
  }

  getUsers = () => {
    return this.http.get(`${this.server_url}/users`)
  }

  updateAdmin = (data: any) => {
    return this.http.put(`${this.server_url}/users/1`, data)
  }

}
