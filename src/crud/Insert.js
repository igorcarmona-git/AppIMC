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
        Alert.alert("SUCESSO!", "Os dados foram salvos no banco de dados")
    } catch (error) {
        Alert.alert("Não foi possível inserir os dados no banco. Por favor, tente novamente!")
    }
};

export default InsertNickname;
