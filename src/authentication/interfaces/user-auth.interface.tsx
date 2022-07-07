import { Observable } from "rxjs";
import { User } from "../models/user.model";

export interface UserAuthService {
  isLoggedIn: boolean;
  currentUser: User | null;    
  getUser(): Observable<User>;
}