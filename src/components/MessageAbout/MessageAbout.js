import { Text, View, StyleSheet } from "react-native";

export default function MessageAbout() {
  return (
    <View>
      <Text style={styles.textbold}>
      O IMC (Índice de Massa Corporal) é um indicador amplamente utilizado em todo o mundo como uma maneira de identificar rapidamente situações de déficit, excesso de peso ou obesidade.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textbold: {
    fontWeight: "bold",
    fontSize: 14,
    margin: 8,
    textAlign: "justify",
    padding: 8,
  },
});
