import { StyleSheet, Text, View } from 'react-native';

import ResultImc from '../Form/ResultImc/ResultImc';
import Form from '../Form/Form';
import Title from '../Title/Title';
import MessageAbout from '../MessageAbout/MessageAbout';

export default function Main(){
    return(
        <View>
            <Title />
            <MessageAbout/>
            <Form />
            <ResultImc />
        </View>
    )
}
  