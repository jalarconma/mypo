import './App.scss';

import React, { useEffect } from 'react';

import AppRouting from './AppRouting';
import { useUserAuthService } from './authentication/hooks/use-user-auth-service';
import useSyncSymbols from './dexie/hooks/use-sync-symbols';
import Header from './shared/components/header/Header';
import InfoContainer from './shared/components/info-container/InfoContainer';
import LoadingSpinner from './shared/components/loading-spinner/LoadingSpinner';

function App() {
  const userAuthService = useUserAuthService();
  const syncSymbols = useSyncSymbols();

  useEffect(() => {
    syncSymbols();
  }, []);

  return (
    <>
      {userAuthService.getLoading() ? <LoadingSpinner /> : null}
      <main className="App">
        <Header />
        <div className='App-content'>
          <AppRouting />
        </div>
      </main>
      <footer>
        <InfoContainer>
          <h4>Developed by Julian Alarcon TM</h4>
        </InfoContainer>
      </footer>
    </>
  );
}

export default App;
