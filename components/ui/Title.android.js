import {Text, StyleSheet, Platform} from 'react-native';

export default function Title({children}) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    // borderWidth: Platform.OS === 'android' ? 2 : 0, //this two commands also work for platform specific codes
    // borderWidth: Platform.select({android: 2, ios: 0}),
    borderWidth: 2,
    borderColor: 'white',
    padding: 12,
    //fontFamily: 'OpenSans-Bold',
    maxWidth: '80%',
    width: 300,
    //the default width will be 300px but for larger screens it will be 80% of the parent element
  },
});
