import { User } from '@prisma/client';

import { buildHttpError } from '../api';

// Types
type UnauthenticatedUser = {
  auth: false;
};

type AuthenticatedUser = {
  auth: true;
  user: {
    userId: String;
    email: String;
  };
};

export type AuthUser = UnauthenticatedUser | AuthenticatedUser;

export type UserParams = {
  email: String;
  password: String;
};

// Handlers
export const authUser = async (): Promise<AuthUser> => {
  const response = await fetch(`/api/auth`);

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};

export const registerUser = async ({ email, password }: UserParams): Promise<User> => {
  const response = await fetch(`/api/auth/register`, {
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

export const signIn = async ({ email, password }: UserParams): Promise<User> => {
  const response = await fetch(`/api/auth/sign-in`, {
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
  const response = await fetch(`/api/auth/sign-out`, { method: 'POST' });

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return;
};
