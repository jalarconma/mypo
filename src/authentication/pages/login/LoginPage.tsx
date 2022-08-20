import styles from './LoginPage.module.scss';

import React from "react";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { useUserAuthService } from '../../hooks/use-user-auth-service';
import useRedirectIntendedUrl from '../../hooks/use-redirect-intended-url';
import { ReactComponent as BTCIcon } from '../../../styling/images/btc-icon.svg';
import { ReactComponent as ETHIcon } from '../../../styling/images/eth-icon.svg';
import { ReactComponent as ADAIcon } from '../../../styling/images/cardano-icon.svg';
import { ReactComponent as METAIcon } from '../../../styling/images/meta-icon.svg';
import { ReactComponent as AMAZONIcon } from '../../../styling/images/amazon-icon.svg';

const LoginPage = () => {
  const userAuthService = useUserAuthService();
  useRedirectIntendedUrl();

  const loginHandler = () => {
    userAuthService.login();
  }

  return (
    <div className={styles['login-page']}>
      <Box className={styles['login-info']}>
        <h1 className={styles['main-title']}>WELCOME TO MYPO</h1>
        <h4>Register your crypto and stock investments</h4>
        <p>Please loging to continue</p>
        <Button onClick={loginHandler} variant="outlined"> Login</Button>
      </Box>
      <Stack 
        component={Box} 
        direction='row' 
        spacing={4}
        display={{ xs: 'none', sm: 'flex', md: 'flex', lg: 'flex' }}
        className={styles['login-brands']} >
        <Box className={styles['logo-container']}>
          <BTCIcon />
        </Box>
        <Box className={styles['logo-container']}>
          <ETHIcon />
        </Box>
        <Box className={styles['logo-container']}>
          <ADAIcon />
        </Box>
        <Box className={styles['logo-container']}>
          <METAIcon />
        </Box>
        <Box className={styles['logo-container']}>
          <AMAZONIcon />
        </Box>
      </Stack>
    </div>
  )
}

export default LoginPage;