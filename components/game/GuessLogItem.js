import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../constants/colors';
export default function guessLogItem({roundNumber, latestGuess}) {
  return (
    <View style={styles.logContainer}>
      <Text>#{roundNumber}</Text>
      <Text>Opponent's Guess: {latestGuess}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  logContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.accent500,
    borderColor: Colors.primary800,
    borderWidth: 0.5,
    borderRadius: 50,
    padding: 12,
    marginVertical: 12,
    width: '100%',
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
});
