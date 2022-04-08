import { Observable } from "rxjs";
import { User } from "../models/user.model";

export interface UserAuthService {
  isLoggedIn: boolean;
  getUser(): Observable<User>;    
}