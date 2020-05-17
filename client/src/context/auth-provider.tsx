import React from 'react';

interface Context {
  data: Data;
  fetchUser: () => Promise<void>;
}
const AuthContext = React.createContext<Context>({
  data: { user: null },
  fetchUser: async () => {}
});

interface Data {
  user: User | null;
}
interface User {
  name: string;
}
function AuthProvider(props: Object) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<Data>({ user: null });

  React.useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  async function fetchUser() {
    setIsLoading(true);
    console.log('fetching user');
    const response = await fetch('/auth/me');
    console.log({ response });
    const data = await response.json();
    console.log({ data });
    // const user = await authClient.getAuthenticatedUser();
    if (data) {
      setData({ user: data.user });
    }
    setIsLoading(false);
  }
  return <AuthContext.Provider value={{ data, fetchUser }} {...props} />;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
