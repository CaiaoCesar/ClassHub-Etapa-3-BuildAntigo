import React from "react";
import { View, Image, Text } from "react-native";
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/contexts/authContext';
import { themes } from "../../src/global/themes";
import { icons } from "../../src/global/icons";
import { style } from "../../src/styles/stylesMenu";
import { Button } from "../../src/components/button/button";

export default function Menu() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Image source={icons.logo} style={style.logo} resizeMode="contain" />
        {user?.photo && (
          <Image source={{ uri: user.photo }} style={style.image} />
        )}
        <Text style={style.text}>{user?.name}</Text>
      </View>

      <View style={style.boxBotton}>
        <Button
          buttonText={themes.strings.agendar}
          buttonStyle={style.button}
          textStyle={style.textAgendar}
          onPress={() => router.push("/(app)/agendar")}
        />
      </View>

      <View style={style.boxBotton}>
        <Button
          buttonText={themes.strings.agendamentos}
          buttonStyle={style.button}
          textStyle={style.textAgendamentos}
          onPress={() => router.push("/(app)/agendamentos")}
        />
      </View>

      <View style={style.boxBotton}>
        <Button
          iconSource={icons.logout}
          buttonText={themes.strings.logout}
          buttonStyle={style.button3}
          textStyle={style.textLogout}
          iconStyle={style.icon}
          onPress={async () => {
            await signOut();
            router.replace('/(auth)/login');
          }}
        />
      </View>
    </View>
  );
}