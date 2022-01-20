import { apiFetch } from '../api';
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
  return apiFetch<AuthUser>(`/auth`);
};

export const registerUser = async ({ name, email, password }: RegisterParams) => {
  return apiFetch<User>(`/auth/register`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
};

export const updateUser = async ({ id, name, email, password }: UpdateParams) => {
  return apiFetch<User>(`/auth/account/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
};

export const signIn = async ({ email, password }: SignInParams) => {
  return apiFetch<User>(`/auth/sign-in`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const signOut = async () => {
  return apiFetch<void>(`/api/auth/sign-out`, { method: 'POST' });
};
