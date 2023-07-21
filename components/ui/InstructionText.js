import {Text, StyleSheet} from 'react-native';
import Colors from '../../constants/colors';

export default function InstructionText({children, style}) {
  //the style prop here is passed by instructionText instance on game screen
  //then we pass it to the arr to style (implementing cascading of styles)
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}
const styles = StyleSheet.create({
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
    //fontFamily: 'Lumanosimo-Regular',
  },
});
