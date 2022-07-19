import { ICredentials } from '@aws-amplify/core/lib/types';

import { Observable } from "rxjs";
import { BaseService } from "../../core/interfaces/base-service";
import { User } from "../models/user.model";

export interface UserAuthService extends BaseService {
  isLoggedIn: boolean;
  currentUser: User | null;    
  getUser(): Observable<User>;
  login(): Promise<ICredentials>;
  logout(): Promise<any>
}