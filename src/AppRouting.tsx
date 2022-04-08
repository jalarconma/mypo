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
      <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
      />
    </Routes>
  );
}

export default AppRouting;