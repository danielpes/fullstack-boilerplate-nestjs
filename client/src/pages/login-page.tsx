import React from 'react';
import { Redirect } from 'react-router-dom';

import { useAuthUser } from '../context/auth-provider';

export function LoginPage() {
  const user = useAuthUser();
  if (user) {
    return <Redirect to="/" />;
  }
  return <a href="/auth/google/login">Login</a>;
}
