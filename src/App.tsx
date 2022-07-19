import React from 'react';
import './App.scss';
import AppRouting from './AppRouting';
import { useUserAuthService } from './authentication/hooks/use-user-auth-service';
import Header from './shared/components/header/Header';
import LoadingSpinner from './shared/components/loading-spinner/LoadingSpinner';

function App() {
  const userAuthService = useUserAuthService();
  return (
    <>
      {userAuthService.getLoading() ? <LoadingSpinner /> : null}
      <main className="App">
        <Header />
        <div className='App-content'>
          <AppRouting />
        </div>
      </main>
      <footer className='App-footer'>
        <h4>Developed by Julian Alarcon TM</h4>
      </footer>
    </>
  );
}

export default App;
