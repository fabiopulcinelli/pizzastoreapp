import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServer = environment.baseURL + '/api/utente';
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
      constructor(private http: HttpClient) {}


    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiServer);
    }

    findById(id: number): Observable<User> {
      return this.http.get<User>(this.apiServer + "/" + id);
    }

    delete(id: number): Observable<boolean> {
      return this.http.delete<boolean>(this.apiServer + "/" + id);
     }

     create(clienteInput: User): Observable<User> {
      return this.http.post<User>(this.apiServer, clienteInput, this.httpOptions);
    }

    update(clienteInput: User): Observable<User> {
      return this.http.put<User>(this.apiServer + "/" + clienteInput.id, clienteInput, this.httpOptions);
    }

    search(example: User): Observable<User[]> {
      return this.http.post<User[]>(this.apiServer + "/search", example, this.httpOptions);
    }
}
