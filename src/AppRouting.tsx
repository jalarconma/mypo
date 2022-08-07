import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './authentication/pages/login/LoginPage';
import { homeModule, loggedInNavModules, loggedInUserModules, loggedOutNavModules, loggedOutUserModules } from './modules';
import NotFoundPage from './shared/components/not-found/NotFoundPage';

const AppRouting = () => {
  const modules = [...loggedInNavModules, ...loggedInUserModules,
  ...loggedOutNavModules, ...loggedOutUserModules];
  return (
    <Routes>
      <Route path="/" element={<Navigate to={homeModule.routeProps.path} replace />} />
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
        path="/login"
        element={<LoginPage />}
      />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default AppRouting;