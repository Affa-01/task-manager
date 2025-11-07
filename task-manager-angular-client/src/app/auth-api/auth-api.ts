import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable, BehaviorSubject } from 'rxjs';

class StatusResponse {
  username!: string;
  loggedIn!: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthApi {
  baseUrl = environment.apiBaseUrl;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);
    let request = this.http.get<StatusResponse>(`${this.baseUrl}/auth/status`, { withCredentials: true });
    request.subscribe(response => {
      next: this.isLoggedInSubject.next(response.loggedIn);
      error:
        this.isLoggedInSubject.next(false);
    });
    return this.http.post(`${this.baseUrl}/login`, body, { responseType: 'text', withCredentials: true})
  }

  logout() {
    let request = this.http.post(`${this.baseUrl}/logout`, {}, { responseType: 'text', withCredentials: true});
    request.subscribe(() => {
      this.isLoggedInSubject.next(false);
    });
    return request;
  }

  isLoggedIn() : Observable<StatusResponse> {
    let request = this.http.get<StatusResponse>(`${this.baseUrl}/auth/status`, { withCredentials: true });
    request.subscribe(response => {
      this.isLoggedInSubject.next(response.loggedIn);
    });
    return request;
  }


  
}
