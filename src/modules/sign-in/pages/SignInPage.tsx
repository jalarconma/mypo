import React, { useEffect } from 'react';

import { useUserAuthService } from '../../../authentication/hooks/use-user-auth-service';

const SignInPage = () => {
  const userAuthService = useUserAuthService();

  useEffect(() => {
    userAuthService.login();
  }, [])

  return (
    <></>
  )
}

export default SignInPage;