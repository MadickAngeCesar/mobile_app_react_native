import {View, Text, StyleSheet} from 'react-native'

export default function Title( {txt} ){
    return(
        <View style={styles.container}>
            <Text style={styles.heading}>{txt}</Text>
        </View>
    );
}    


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    heading: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      color: '#007bff',
      fontWeight: 'bold',
      fontSize: 40,
      padding: 10,
    },
});