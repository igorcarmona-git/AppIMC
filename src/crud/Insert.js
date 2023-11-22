import { addDoc, collection} from 'firebase/firestore';
import { Alert } from 'react-native';
import { db } from '../utils/Firebase';

async function InsertNickname(props){
    try {
        await addDoc(collection(db, 'nicknames'), 
        {
            name: props.nickname,
            height: props.height,
            weight: props.weight,
            imcValue: props.resultImc,
        });
        Alert.alert("The data has been sent!")
    } catch (error) {
        Alert.alert("It wasn't possible to insert data, please try again! Try to contact an administrator.")
    }
};

export default InsertNickname;
