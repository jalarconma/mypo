import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { loggedInNavModules, loggedInUserModules, loggedOutNavModules, loggedOutUserModules } from './modules';

const AppRouting = () => {
  const modules = [...loggedInNavModules, ...loggedInUserModules,
  ...loggedOutNavModules, ...loggedOutUserModules];
  return (
    <Routes>
      {
        modules.map(module => (
          <React.Fragment key={module.name}>
            <Route {...module.routeProps}>
              {module.nestedChildren ?
                (
                  module.nestedChildren.map(child => (
                    <Route {...child.routeProps} key={child.name} />
                  ))
                ) :
                null
              }
            </Route>
            {module.pathChildren ?
              (
                module.pathChildren.map(child => (
                  <Route {...child.routeProps} key={child.name} />
                ))
              ) :
              null
            }
          </React.Fragment>
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