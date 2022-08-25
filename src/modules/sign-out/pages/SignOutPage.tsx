import React, { useEffect } from 'react';

import { useUserAuthService } from '../../../authentication/hooks/use-user-auth-service';
import useSyncSymbols from '../../../dexie/hooks/use-sync-symbols';

const SignOutPage = () => {
  const userAuthService = useUserAuthService();
  const { clear: clearMypoDB } = useSyncSymbols();
  
  useEffect(() => {
    userAuthService.logout();
    clearMypoDB();
  }, [])

  return (
    <></>
  )
};

export default SignOutPage;