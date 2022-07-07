import './App.scss';
import AppRouting from './AppRouting';
import Header from './shared/components/header/Header';

function App() {
  return (
    <>
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
