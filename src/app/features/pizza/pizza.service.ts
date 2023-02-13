import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Pizza} from 'src/app/model/pizza';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  private apiServer = environment.baseURL + '/api/pizza';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {
  }


  getAllPizze(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.apiServer);
  }

  findById(id: number): Observable<Pizza> {
    return this.http.get<Pizza>(this.apiServer + "/" + id);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiServer + "/" + id);
  }

  create(pizzaInput: Pizza): Observable<Pizza> {
    return this.http.post<Pizza>(this.apiServer, pizzaInput, this.httpOptions);
  }

  update(pizzaInput: Pizza): Observable<Pizza> {
    return this.http.put<Pizza>(this.apiServer + "/" + pizzaInput.id, pizzaInput, this.httpOptions);
  }

  search(example: Pizza): Observable<Pizza[]> {
    return this.http.post<Pizza[]>(this.apiServer + "/search", example, this.httpOptions);
  }
}
