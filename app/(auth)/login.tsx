import React, { useState } from "react";
import { View, Image, Alert } from "react-native";
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/contexts/authContext';
import { themes } from "../../src/global/themes";
import { icons } from "../../src/global/icons";
import { style } from "../../src/styles/stylesLogin";
import { Button } from "../../src/components/button/button";

export default function Login() {
  const router = useRouter();
  const { signInWithGoogle } = useAuth();
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      router.replace('/(app)/menu');
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Falha no login");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Image source={icons.logo} style={style.logo} resizeMode="contain" />
      </View>

      <View style={style.boxBotton}>
        <Button
          iconSource={icons.gmail}
          buttonText={themes.strings.gmail}
          buttonStyle={style.button1}
          textStyle={style.textGmail}
          iconStyle={style.icon}
          onPress={handleGoogleSignIn}
          isLoading={googleLoading}
          disabled={googleLoading}
        />
      </View>
    </View>
  );
}