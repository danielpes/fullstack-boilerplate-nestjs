import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/auth-provider';
import './app.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/">
              <Home />
            </PrivateRoute>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

function Login() {
  const user = useAuth().data.user;

  if (user) {
    return <Redirect to="/" />;
  }

  return <a href="/auth/google/login">Login</a>;
}

function Home() {
  const { data } = useAuth();
  return <h1>{`Hello, ${data.user?.name}`}</h1>;
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
interface PrivateRouteProps {
  children: React.ReactChild;
  [key: string]: any;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
  const { data } = useAuth();

  return <Route {...rest}>{data.user ? children : <Redirect to="/login" />}</Route>;
};

export default App;
