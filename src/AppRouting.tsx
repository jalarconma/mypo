import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { loggedInNavModules, loggedInUserModules, loggedOutNavModules, loggedOutUserModules} from './modules';

const AppRouting = () => {
  const modules = [...loggedInNavModules, ...loggedInUserModules, 
    ...loggedOutNavModules, ...loggedOutUserModules];
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