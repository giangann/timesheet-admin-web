import React from 'react';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import { getApi, postApi } from 'src/services/api';
import { TCredentials, TUserInfo } from 'src/types/auth';

export const AuthContext = React.createContext<{
  token: string | null;
  user: TUserInfo | null;
  signIn: (credentials: TCredentials) => any;
  verifyToken: () => any;
}>({
  token: null,
  user: null,
  signIn(_credentials) {},
  verifyToken() {},
});

type ProviderProps = {
  children: React.ReactNode;
};
export function AuthProvider({ children }: ProviderProps) {
  const [tokenValue, setTokenValue] = useLocalStorage<string>('token');
  const [userInfoValue, setUserInfoValue] = useLocalStorage<TUserInfo>('user');

  // define signIn, logOut, verifyToken
  const signIn = React.useCallback(
    async (credentials: TCredentials) => {
      const signInRes = await postApi('/auth/login', credentials);
      if (signInRes.statusCode === 200) {
        // update token
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

  const verifyToken = React.useCallback(async () => {
    console.log('tokenValue', tokenValue);
    const responseJson = await getApi('/auth/verify-token', { token: tokenValue });
    console.log('responseJson', responseJson);
    if (responseJson.statusCode === 200) {
      const userInfo: TUserInfo | null = responseJson?.data?.user;
      console.log('userInfo', userInfo);
      if (userInfo) {
        setUserInfoValue(userInfo);
      } else {
        throw new Error('Bad Response! - Cannot update storage data');
      }
    }
    return responseJson;
  }, [tokenValue, setUserInfoValue]);

  const authValue = React.useMemo(
    () => ({
      token: tokenValue,
      user: userInfoValue,
      signIn,
      verifyToken,
    }),
    [tokenValue, userInfoValue, signIn, verifyToken]
  );

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}
