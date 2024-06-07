import { StyleSheet, View } from 'react-native';
import AuthContent from './components/Auth/AuthContent';

export default function App() {
  return (
    <View style={styles.container}>
      <AuthContent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
