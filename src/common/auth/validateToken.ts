import jwt from 'jsonwebtoken';

export const validateToken = (): boolean => {
  const token: string | null = localStorage.getItem('userToken');
  
  if (!token) {
    return false;
  }
  
  try {
    const decoded: any = jwt.decode(token);

    if (!decoded || !decoded.exp) {
      return false;
    }

    const currentTimestamp: number = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTimestamp) {
      // Token has expired
      return false;
    }

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
