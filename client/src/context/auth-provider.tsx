import React from 'react';

interface AuthContext {
  data: ContextData;
  logout: () => void;
}
interface ContextData {
  user: User | null;
}
interface User {
  id: string;
  name: string;
  email: string;
  pictureUrl: string;
}

const AuthContext = React.createContext<AuthContext>({
  data: { user: null },
  logout: () => {}
});

export function AuthProvider(props: Object) {
  const [data, setData] = React.useState<ContextData>({ user: null });
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    (function getCurrentUser() {
      setIsLoading(true);
      fetch('/auth/me')
        .then((res) => res.json())
        .then((data) => (data ? setData({ user: data.user }) : logout()))
        .catch(() => logout())
        .finally(() => setIsLoading(false));
    })();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  function logout(): Promise<void> {
    setData({ user: null });
    return fetch('/auth/logout').then(() => {});
  }

  return <AuthContext.Provider value={{ data, logout }} {...props} />;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export function useAuthUser() {
  return useAuth().data.user;
}
