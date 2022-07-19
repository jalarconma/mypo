import React, { useEffect } from 'react';

import { useUserAuthService } from '../../../authentication/hooks/use-user-auth-service';

const SignOutPage = () => {
  const userAuthService = useUserAuthService();

  useEffect(() => {
    userAuthService.logout();
  }, [])

  return (
    <></>
  )
};

export default SignOutPage;