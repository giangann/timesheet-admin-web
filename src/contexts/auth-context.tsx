import React from 'react';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import { useRouter } from 'src/routes/hooks';
import { getApi, postApi } from 'src/services/api';
import { TCredentials, TUserInfo } from 'src/types/auth';

export const AuthContext = React.createContext<{
  token: string | null;
  user: TUserInfo | null;
  signIn: (credentials: TCredentials) => any;
  logout: () => any;
  verifyToken: () => any;
}>({
  token: null,
  user: null,
  signIn(_credentials) {},
  logout() {},
  verifyToken() {},
});

type ProviderProps = {
  children: React.ReactNode;
};
export function AuthProvider({ children }: ProviderProps) {
  const [[loading, tokenValue], setTokenValue] = useLocalStorage<string>('token');
  const [[_, userInfoValue], setUserInfoValue] = useLocalStorage<TUserInfo>('user');
  const router = useRouter();

  const signIn = React.useCallback(
    async (credentials: TCredentials) => {
      const signInRes = await postApi('/auth/login', credentials);
      if (signInRes.statusCode === 200) {
        const token = signInRes?.data?.token;
        if (token) {
          setTokenValue(token);
        } else {
          throw new Error('Bad Response! - Cannot update storage data');
        }
      }
      return signInRes;
    },
    [setTokenValue]
  );

  const logout = React.useCallback(() => {
    setTokenValue(null);
    setUserInfoValue(null);
    router.replace('/sign-in');
  }, [router, setTokenValue, setUserInfoValue]);

  const verifyToken = React.useCallback(async () => {
    if (loading) return null; // Ensure token is available before calling

    const responseJson = await getApi('/auth/verify-token', { token: tokenValue });
    if (responseJson.statusCode === 200) {
      const userInfo: TUserInfo | null = responseJson?.data?.user;
      if (userInfo) {
        setUserInfoValue(userInfo);
      } else {
        throw new Error('Bad Response! - Cannot update storage data');
      }
    }
    return responseJson;
  }, [loading, tokenValue, setUserInfoValue]);

  const authValue = React.useMemo(
    () => ({
      token: tokenValue,
      user: userInfoValue,
      signIn,
      logout,
      verifyToken,
    }),
    [tokenValue, userInfoValue, signIn, logout, verifyToken]
  );

  if (loading) {
    return <div>Loading...</div>; // Or some loading indicator
  }

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}
