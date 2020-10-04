import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { AuthProvider, useAuthUser } from './context/auth-provider';
import { LoginPage } from './pages/login-page';
import { HomePage } from './pages/home-page';

import './App.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute path="/">
              <HomePage />
            </PrivateRoute>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

interface PrivateRouteProps {
  children: React.ReactChild;
  [key: string]: any;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
  const user = useAuthUser();
  return <Route {...rest}>{user ? children : <Redirect to="/login" />}</Route>;
};

export default App;
