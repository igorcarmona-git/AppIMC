import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../utils/Firebase';
import { Alert } from "react-native";

export default async function DeleteUser({ documentId }){
    try {
      const userDoc = doc(db, 'nicknames', `${documentId}`);
      await deleteDoc(userDoc);
      Alert.alert('The user has been deleted!');
    } catch (error) {
      Alert.alert('Error','Error to delete the user:', error);
    }
  };
