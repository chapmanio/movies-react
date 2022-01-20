import { authedApiFetch } from '../api';
import type { User } from './types';

// Types
type UnauthenticatedUser = {
  auth: false;
};

type AuthenticatedUser = {
  auth: true;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export type AuthUser = UnauthenticatedUser | AuthenticatedUser;

export type RegisterParams = {
  name: string;
  email: string;
  password: string;
};

export type SignInParams = {
  email: string;
  password: string;
};

export type UpdateParams = {
  id: string;
  name: string;
  email: string;
  password: string;
};

// Handlers
export const authUser = async () => {
  return authedApiFetch<AuthUser>(`/auth`);
};

export const registerUser = async ({ name, email, password }: RegisterParams) => {
  return authedApiFetch<User>(`/auth/register`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
};

export const updateUser = async ({ id, name, email, password }: UpdateParams) => {
  return authedApiFetch<User>(`/auth/account/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
};

export const signIn = async ({ email, password }: SignInParams) => {
  return authedApiFetch<User>(`/auth/sign-in`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const signOut = async () => {
  return authedApiFetch<void>(`/auth/sign-out`, { method: 'POST' });
};
