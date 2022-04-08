import { useEffect, useState } from 'react';
import { Auth, Hub } from 'aws-amplify';

import './App.scss';
import AppRouting from './AppRouting';
import Header from './shared/components/Header';



function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
        default:
          break;
      }
    });

    getUser().then(userData => setUser(userData));

  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }

  return (
    <div className="App">
      <div className='App-header'>
        <Header />
        <p>User: {user ? JSON.stringify(user.attributes) : 'None'}</p>
      </div>
      <div className='App-content'>
        <AppRouting />
      </div>
    </div>
  );
}

export default App;
