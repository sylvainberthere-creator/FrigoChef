import AppNavigator from './_layout';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <AppNavigator />
      <StatusBar style="dark" />
    </>
  );
}
