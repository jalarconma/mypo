import { Route, Routes } from 'react-router-dom'
import modules from './modules';

const AppRouting = () => {
  return (
    <Routes>
      {
        modules.map((module) => (
          <Route {...module.routeProps} key={module.name}></Route>
        ))
      }
    </Routes>
  );
}

export default AppRouting;