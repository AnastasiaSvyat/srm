import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!:User 
  constructor() {}
  isAuthorized(){
    return !!this.user
  }
  hasRole(role :Role){
    return this.isAuthorized() && this.user.role === role
  }
  login(role: Role) {
    this.user = {role : role}
  }
  // logout() {
  //     this.user = null
  // }
}
