import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/contexts/authContext';
import { icons } from '../src/global/icons';
import { style } from "../src/styles/stylesIndex";

export default function Splash() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoading) {
        router.replace(user ? '/(app)/menu' : '/(auth)/login');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [user, isLoading]);

  return (
    <View style={style.container}>
      <Image source={icons.splash} style={style.splashImage} resizeMode="contain" />
    </View>
  );
}