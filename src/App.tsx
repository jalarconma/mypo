import './App.scss';
import AppRouting from './AppRouting';
import Header from './shared/components/Header';

function App() {
  return (
    <div className="App">
      <div className='App-header'>
        <Header />
      </div>
      <div className='App-content'>
        <AppRouting />
      </div>
      <div className='App-footer'>
        <div>
          <h4>Developed by Julian Alarcon TM</h4>
        </div>
      </div>
    </div>
  );
}

export default App;
