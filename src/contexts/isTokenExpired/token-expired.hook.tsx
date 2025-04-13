import { useEffect } from 'react';
import { JwtPayload } from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';

const useIsTokenExpired = (token: string, pathname: string, replace: any) => {
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);

      if (decoded && decoded.exp) {
        const expiryTime = decoded.exp;
        const currentTime = Math.floor(Date.now() / 1000);

        if (currentTime >= expiryTime) {
          replace({ pathname, query: { expired: 'true' } });
        }
      }
    }
  }, [token]);
};

export default useIsTokenExpired;
