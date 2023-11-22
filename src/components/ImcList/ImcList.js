import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../utils/Firebase';
import { Button, Icon } from 'react-native-elements';

import DeleteUser from '../../crud/Delete';

const ImcList = ({ navigation, route }) => {
  const [ListNicknames, setListNicknames] = useState([]);
  const [counter, setCounter] = useState(0);

  const enableDeleteData = async (itemId) => {
    Alert.alert(
      'CONFIRMAÇÃO',
      'Você tem certeza que você quer deletar este usuário?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim, eu tenho',
          onPress: async () => {
            await DeleteUser({ documentId: itemId });
            setCounter((prevCounter) => prevCounter + 1);
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const nicknamesCollection = collection(db, 'nicknames');
        const querySnapshot = await getDocs(nicknamesCollection);

        const nicknames = [];

        querySnapshot.forEach((doc) => {
          nicknames.push({
            id: doc.id,
            height: doc.data().height,
            imcValue: doc.data().imcValue,
            name: doc.data().name,
            weight: doc.data().weight,
          });
        });

        setListNicknames(nicknames);
      } catch (error) {
        console.error('Erro ao conseguir informações:', error);
        Alert.alert('ERRO', "Não foi possível adquirir informações sobre o conteúdo");
      }
    };

    getUsers();
  }, [counter]);

  return (
    <View style={styles.container}>
      <Text>{route.params}</Text>

      <Text style={styles.title}>Listagem de IMCs</Text>

      <ScrollView style={styles.scrollView}>
        {ListNicknames.map((item) => {
          const { height, imcValue, name, weight} = item;
          return (
            <View style={styles.card} key={item.id}>
              <View style={styles.iconsContainer}>
                <Button
                  type='clear'
                  icon={<Icon name="edit" size={32} color="green" />}
                  onPress={() => navigation.navigate("EditScreen", {userID:item.id})}
                />
                <Button
                  type='clear'
                  icon={<Icon name="delete-forever" size={32} color="red" />}
                  onPress={() => enableDeleteData(item.id)}
                />
              </View>

              <Text style={styles.nameTitle}>{name}</Text>
              <View style={styles.infoContainer}>
                <Text style={styles.textList}>Altura: {height}</Text>
                <Text style={styles.textList}>Peso: {weight}</Text>
                <Text style={styles.textList}>IMC: {imcValue}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 28,
    color: 'red',
    marginBottom: 20,
  },

  scrollView: {
    width: '90%',
  },

  card: {
    width: '90%',
    height: 100,
    marginBottom: 20,
    elevation: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  iconsContainer: {
    position: 'absolute',
    top: 2,
    right: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 70,
  },

  infoContainer: {
    flexDirection: 'row',
    gap: 14,
    paddingRight: 10,
  },

  textList: {
    fontSize: 18,
  },

  nameTitle: {
    fontSize: 23,
    marginBottom: 20,
    fontWeight: 'bold',
    marginRight: '50%',
    paddingLeft: 10,
  },
});

export default ImcList;
