import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ordine } from 'src/app/model/ordine';

@Injectable({
  providedIn: 'root'
})
export class OrdineService {

  private apiServer = 'http://localhost:8080/api/ordine';
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
      constructor(private http: HttpClient) {}


    getAllOrdini(): Observable<Ordine[]> {
        return this.http.get<Ordine[]>(this.apiServer);
    }

    findById(id: number): Observable<Ordine> {
      return this.http.get<Ordine>(this.apiServer + "/" + id);
    }

    delete(id: number): Observable<boolean> {
      return this.http.delete<boolean>(this.apiServer + "/" + id);
     }

     create(ordineInput: Ordine): Observable<Ordine> {
      return this.http.post<Ordine>(this.apiServer, ordineInput, this.httpOptions);
    }

    update(ordineInput: Ordine): Observable<Ordine> {
      return this.http.put<Ordine>(this.apiServer + "/" + ordineInput.id, ordineInput, this.httpOptions);
    }

    search(example: Ordine): Observable<Ordine[]> {
      return this.http.post<Ordine[]>(this.apiServer + "/search", example, this.httpOptions);
    }
}
