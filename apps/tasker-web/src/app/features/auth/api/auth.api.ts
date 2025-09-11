import { inject, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '@tasker/shared';


@Injectable()
export class AuthApi {

  private readonly http = inject(HttpClient);

  constructor(
    @Inject('API_URL') private apiUrl: string,
  ) {
    console.log(apiUrl);
  }


  login(email: string, password: string) {
    return this.http.post<UserModel>(`${this.apiUrl}/auth/login`, { email, password });
  }

  register(user:UserModel) {
    return this.http.post<UserModel>(`${this.apiUrl}/auth/register`, user);
  }


}
