import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";

import ResultImc from "./ResultImc/ResultImc";
import InsertNickname from "../../crud/Insert";

export default function Form() {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [messageImc, setMessageImc] = useState("");
  const [imcTextResult, setImcTextResult] = useState("");
  const [verification, setVerification] = useState("");
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular");
  const [nickname, setNickname] = useState("");

  let underweight = 18.5;
  let normal = 24.9;
  let overweight = 29.9;
  let userIMC = imc;

  function enableShowData(){
    Alert.alert(
      'CONFIRMAÇÃO',
      'Você concorda em salvar seus dados em nosso banco de dados?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim, eu concordo',
          onPress: () => {
            InsertNickname({
              nickname, weight, height, resultImc:userIMC
            });
          },
        },
      ],
      // the user cant cancel touching in someplace out of the dialog screen
      { cancelable: false }
    );
  };

  function imcCalculator() {
    const heightToMeters = (height / 100);
    const calculatedImc = parseFloat(weight / (heightToMeters * heightToMeters)).toFixed(2);
    setImc(calculatedImc);
    userIMC = calculatedImc;
  }

  function validationImc() {
    if (weight !== null && height !== null) {
      imcCalculator();
      enableShowData();

      setMessageImc("IMC: ");
      setTextButton("Calcular novamente");
      setVerification("");

      return;
    }

    setImc(null);
    setTextButton("Calcular");
    setMessageImc("");
    setVerification("Você precisar colocar os valores acima para calcular");
  }
  
  useEffect(() => {
    if (imc !== null) {
      if (imc < underweight) {
        setImcTextResult("Você está abaixo do peso");
      } else if (imc < normal) {
        setImcTextResult("Seu peso está normal para a sua altura");
      } else if (imc < overweight) {
        setImcTextResult("Voce está acima do peso");
      } else {
        setImcTextResult("Você está em Obesidade. Consulte um médico");
      }
    } else if(textButton === "Calcular"){
      setImcTextResult("");
    }

    setHeight(null);
    setWeight(null);
    setNickname("");
  }, [imc]);

  return (
    <View>
        <View style={styles.centerForm}>
          <Text style={styles.textAboveInputs}>Nome completo</Text>
            <TextInput
              style={styles.textInputs}
              onChangeText={setNickname}
              value={nickname}
              placeholder='Exemplo: Igor Carmona'
              keyboardType='default'
            />

          <Text style={styles.textAboveInputs}>Altura</Text>
          <TextInput
            style={styles.textInputs}
            onChangeText={setHeight}
            value={height}
            placeholder='Exemplo: 175'
            keyboardType='numeric'
          />

          <Text style={styles.textAboveInputs}>Peso</Text>
          <TextInput
            style={styles.textInputs}
            onChangeText={setWeight}
            value={weight}
            placeholder='Exemplo: 80'
            keyboardType='numeric'
          />

          <TouchableOpacity style={styles.calculateButton} onPress={() => validationImc()}>
            <Text style={styles.buttonText}>{textButton}</Text>
          </TouchableOpacity>
        </View>

        <ResultImc 
          messageResultImc={messageImc} 
          resultImc={imc} 
          textImc={imcTextResult} 
          verify={verification}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  centerForm: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
    width: '100%',
    height: 'auto',
  },

  textAboveInputs:{
    fontSize: 32,
  },

  textInputs:{
    marginTop: 4,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 12,
    width: '70%',
    backgroundColor: 'white',
  },

  calculateButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 24,
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
