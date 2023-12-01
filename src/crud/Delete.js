import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../utils/Firebase';
import { Alert } from "react-native";

export default async function DeleteUser({ documentId }){
    try {
      const userDoc = doc(db, 'nicknames', `${documentId}`);
      await deleteDoc(userDoc);
      Alert.alert('SUCESSO!', 'O usuário foi deletado do banco de dados');
    } catch (error) {
      Alert.alert('ERRO','Erro ao deletar o usuário:', error);
    }
  };
