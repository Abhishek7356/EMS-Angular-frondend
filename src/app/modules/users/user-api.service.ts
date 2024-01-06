import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from './models/users.models';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  server_url: string = 'https://ems-angular-backend-wncl.onrender.com'
  constructor(private http: HttpClient) { }

  //add a user API - post - data sent to the server
  addUserApi(user: UserModel) {
    return this.http.post(`${this.server_url}/users`, user)
  }
  getAllApi = () => {
    return this.http.get(`${this.server_url}/users`)
  }
  deleteApi = (id: any) => {
    return this.http.delete(`${this.server_url}/users/${id}`)
  }
  getOneUser = (id: any) => {
    return this.http.get(`${this.server_url}/users/${id}`)
  }
  updateUser = (id: any, data: any) => {
    return this.http.put(`${this.server_url}/users/${id}`, data)
  }
}
