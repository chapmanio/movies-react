import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export const createJwtCookie = (userId, email) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  const token = jwt.sign({ userId, email }, process.env.JWT_SECRET, {
    expiresIn: '10 days',
  });

  const jwtCookie = cookie.serialize('jwt', token, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    path: '/',
  });

  return jwtCookie;
};

export const clearCookie = () => {
  return 'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};
