import styles from './LoginPage.module.scss';

import React from "react";
import { useUserAuthService } from '../../hooks/use-user-auth-service';
import useRedirectIntendedUrl from '../../hooks/use-redirect-intended-url';


const LoginPage = () => {
  const userAuthService = useUserAuthService();
  useRedirectIntendedUrl();

  const loginHandler = () => {
    userAuthService.login();
  }

  return (
    <div className={styles['login-page']}>
      <h2>Welcome to login page! </h2>
      <p>Please loging to continue</p>
      <button onClick={loginHandler}> Login</button>
    </div>
  )
}

export default LoginPage;