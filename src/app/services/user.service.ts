import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { User } from '../models/user';

export interface UserInsert {
  nome?: string;
  cognome?: string;
  email?: string,
  username?: string;
  password?: string;
  dataNascita?: Date;
  ruolo?: {
    id: number,
    codice?: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServer = 'http://localhost:8080/api/utente';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getUserList(): Observable<User[]>{
    return this.http.get<User[]>(this.apiServer);
  }


  updateUser(user: User){
    const url = `${this.apiServer}/${user.id}`;

    let invia: UserInsert = user;
    invia.ruolo = {id:2 , codice: user.role};

    return this.http.put<User>(url, user, this.httpOptions).subscribe(data => {
      console.log(data);
    });
  }

  deleteUser(idUser: number){
    const url = `${this.apiServer}/${idUser}`;
    return this.http.delete<User>(url).subscribe(data => {
      console.log(data);
    });
  }

  aggiungiUser(user: User){
    user.id = undefined;
    
    //per default nome e' come username e cognome come password
    user.username = user.nome;
    user.password = user.cognome;

    //di default ruolo user
    user.role = "ROLE_CLASSIC_USER";

    let invia: UserInsert = user;
    invia.ruolo = {id:2 , codice: "ROLE_CLASSIC_USER"};

    return this.http.post<User>(this.apiServer, user, this.httpOptions).subscribe(data => {
      console.log(data);
    });
  }


  getUserById(idUser: number): Observable<User | null>{
    const url = `${this.apiServer}/${idUser}`;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched USer id=${idUser}`)),
      catchError(this.handleError<User>(`user id=${idUser}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
