import { Text, View, StyleSheet } from 'react-native';

export default function Title() {
    return (
      <View>
        <Text style={styles.title}>Team IMC</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    color: 'red',
    textAlign: 'center',
    marginTop: 8
  },
});