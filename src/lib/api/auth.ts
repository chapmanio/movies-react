import { User } from '@prisma/client';

import { buildHttpError } from '../api';

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
export const authUser = async (): Promise<AuthUser> => {
  const response = await fetch(`/api/auth`);

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};

export const registerUser = async ({ name, email, password }: RegisterParams): Promise<User> => {
  const response = await fetch(`/api/auth?action=register`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};

export const updateUser = async ({ id, name, email, password }: UpdateParams): Promise<User> => {
  const response = await fetch(`/api/auth?action=account&id=${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};

export const signIn = async ({ email, password }: SignInParams): Promise<User> => {
  const response = await fetch(`/api/auth?action=sign-in`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};

export const signOut = async (): Promise<void> => {
  const response = await fetch(`/api/auth?action=sign-out`, { method: 'POST' });

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return;
};
