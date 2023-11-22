import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../utils/Firebase';

const EditUser = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [loading, setLoading] = useState(true);
  const [userID] = useState(route.params?.userID ? [route.params.userID] : []);

  const userFormated = userID.at(0);

  useEffect(() => {
    // Evita a execução do código se userID não estiver definido
    if (!userID) {
      return;
    }

    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'nicknames', userFormated));
        const userData = userDoc.data();

        if (userData) {
          setName(userData.name);
          setHeight(userData.height);
          setWeight(userData.weight);
        } else {
          Alert.alert('Erro', 'Dados do usuário não encontrados');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        Alert.alert('Erro', 'Não foi possível buscar os dados do usuário');
      }finally {
        setLoading(false); // define o carregamento como falso, independentemente do sucesso ou falha
      }
    };

    fetchUserData();
  }, [userID]);

  const handleSave = async () => {
    try {
      if (!name || !height || !weight) {
        Alert.alert('ERRO', 'Preencha todos os campos obrigatórios');
        return;
      }

      const userDoc = doc(db, 'nicknames', userFormated);
      await updateDoc(userDoc, {
        name,
        height,
        weight,
      });

      Alert.alert('SUCESSO', 'Dados do usuário atualizados com sucesso');
      navigation.navigate('ImcList');
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
      
      // Adicione esta parte para exibir a mensagem de erro específica do Firebase
      if (error.message) {
        Alert.alert('ERRO', 'Erro ao atualizar dados do usuário');
      } else {
        Alert.alert('ERRO', 'Não foi possível atualizar os dados do usuário');
      }
    }
  };

  // ou qualquer outro indicador de carregamento
  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.centerForm}>
      <Text style={styles.title}>Editar conteúdo de usuário</Text>
      <TextInput
        style={styles.textInputs}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        keyboardType="default"
      />
      <TextInput
        style={styles.textInputs}
        placeholder="Height"
        value={height}
        onChangeText={(text) => setHeight(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.textInputs}
        placeholder="Weight"
        value={weight}
        onChangeText={(text) => setWeight(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.saveButton} onPress={() => handleSave()}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centerForm: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
    width: '100%',
    height: 'auto',
  },

  textInputs: {
    marginTop: 4,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 12,
    width: '70%',
    backgroundColor: 'white',
  },

  title: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 28,
    color: 'red',
    marginBottom: 20,
  },

  saveButton: {
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

export default EditUser;