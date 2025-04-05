import { Stack } from "expo-router";
import { AuthProvider } from  '../src/contexts/authContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen name="(app)/menu" options={{ headerShown: false }} />
        <Stack.Screen name="(app)/agendar" options={{ headerShown: false }} />
        <Stack.Screen name="(app)/agendamentos" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}