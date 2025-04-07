import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { getToken, saveToken } from '../storage/tokenCache';

type AuthUser = {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  idToken: string;
};

type AuthContextType = {
  user: AuthUser | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const configureGoogleSignIn = async () => {
      await GoogleSignin.configure({
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
        iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
        offlineAccess: true,
      });
    };
    configureGoogleSignIn();
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
          const currentUser = await GoogleSignin.getCurrentUser();
          const tokens = await GoogleSignin.getTokens();
          
          if (currentUser && tokens?.idToken) {
            setUser({
              id: currentUser.user.id,
              name: currentUser.user.name || null,
              email: currentUser.user.email,
              photo: currentUser.user.photo || null,
              idToken: tokens.idToken,
            });
          }
        }
      } catch (error) {
        console.error('Failed to load user', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();

      if (!tokens.idToken) {
        throw new Error('No ID token received');
      }

      const userData: AuthUser = {
        id: userInfo.user.id,
        name: userInfo.user.name || null,
        email: userInfo.user.email,
        photo: userInfo.user.photo || null,
        idToken: tokens.idToken,
      };

      await saveToken('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        throw new Error('Login cancelado');
      } else {
        throw new Error('Falha no login com Google');
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      await saveToken('user', '');
      setUser(null);
    } catch (error) {
      console.error('Failed to sign out', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};