import { StyleSheet, Text, View } from 'react-native';

export default function ResultImc(props){
    return(
        <View>
            <Text style={styles.heightText}>{props.messageResultImc}</Text>
            <Text style={styles.resultStyle}>{props.resultImc}</Text>

            <View>
                <Text style={styles.textContentImc}>{props.textImc}</Text>
                <Text style={styles.verificationStyle}>{props.verify}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    heightText:{
        textAlign: 'center',
        marginTop: 24,
        fontSize: 24,
        fontWeight: 'bold',
    },
    
    resultStyle:{
        textAlign: 'center',
        marginTop: 8,
        fontSize: 42,
        fontWeight: 'bold',
        color: 'red',
        borderColor: 'black',
    },

    verificationStyle:{
        textAlign: 'center',
        marginTop: 8,
        fontSize: 18,
        fontWeight: 'bold',
    },

    textContentImc:{
        marginTop: 24,
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center',
        color: 'red',
        marginHorizontal: 8,
    }
})