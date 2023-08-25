import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly APIUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllUser() {
    return this.http.get(`${this.APIUrl}/users`);
  }

  login(user:any) {
    return this.http.post(`${this.APIUrl}/users/login`,user);
  }

  registerUser(user:any) {
    return this.http.post(`${this.APIUrl}/users/create`,user);
  }

  updateUser(user:any) {
    return this.http.put(`${this.APIUrl}/users/update`,user);
  }

  deleteUser(user:any) {
    return this.http.delete(`${this.APIUrl}/users/delete/${user}`);
  }

  getById(user:any) {
    return this.http.get(`${this.APIUrl}/Users/${user}`);
  }


}
