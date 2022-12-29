import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServer = 'http://localhost:8080/api';
  private apiServerUtente = 'http://localhost:8080/api/utente/userInfo';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient, private router: Router) { }

  private userLoggedSubject$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  login(loginForm: User): Observable<User> {
    return this.http.post<{'jwt-token': string}>(this.apiServer + "/auth/login", JSON .stringify(loginForm), this.httpOptions).pipe(
      switchMap(res => of({ username: loginForm.username, token: res['jwt-token'] }))
    );
  }

  roles(): Observable<string[]> {
    return this.http.get<{ roles: string[] }>(this.apiServerUtente).pipe(map(res => res.roles));
  }

  setUserLogged(user:User | null) {

    this.userLoggedSubject$.next(user);

    if(user != null) {
    this.getUserRoles().subscribe({
      next: res => user!.ruoli = res.roles,
      complete: () => {
        this.userLoggedSubject$.next(user);
        if(user.ruoli?.find(role => role === "FATTORINO_ROLE")){
          this.router.navigateByUrl("fattorino/list");
        } else {
          this.router.navigateByUrl("welcome");
        }
      }
    });
    }
  }

  getUserLogged(): Observable<User | null> {
    return this.userLoggedSubject$.asObservable();
  }

  getUserRoles(): Observable<{roles: string[]}> {
    return this.http.get<{roles: string[]}>(this.apiServerUtente);
  }

  isLoggedIn(): boolean {
    return this.userLoggedSubject$.value ? !!this.userLoggedSubject$.value.token : false;
  }

  getUserToken(): string | null | undefined {
    return this.userLoggedSubject$.value ? this.userLoggedSubject$.value.token : null;
  }

  logout() {
    this.setUserLogged(null);
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      err.error?.errors?.forEach((element: { message: string; }) => {
        errorMessage += element.message;
      });
    }
    console.error(errorMessage);
  }
}

