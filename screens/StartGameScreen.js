import {useState} from 'react';
import {
  Alert,
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

import PrimaryButton from '../components/ui/PrimaryButton';
import Colors from '../constants/colors';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

function StartGameScreen({onPickNumber}) {
  const [enteredNumber, setEnteredNumber] = useState('');
  const {height, width} = useWindowDimensions();
  //used this here bcs it should calculate every time the component is rendered (eg. when user
  //rotates when playing game) so the stylesheet is executed only once so the
  //dimension would not have been changed dynamically
  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber('');
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid Number!', 'Number must be between 1 to 99.', [
        {text: 'Okay', style: 'destructive', onPress: resetInputHandler},
      ]);
      return; //if num is invalid stopping execution of func
    }
    onPickNumber(chosenNumber); //onPickNumber is prop declared by us for startgamescreen
    //it actually executes the pickedNumberHandler function bcs it is passed
    //console.log(chosenNumber);
  }

  const marginTopDistance = height < 380 ? 30 : 100;

  return (
    <ScrollView>
      {/* this and the next had screen as style but not working */}
      <KeyboardAvoidingView behavior="position">
        <View style={[styles.rootContainer, {marginTop: marginTopDistance}]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={numberInputHandler}
              value={enteredNumber}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPressCustom={resetInputHandler}>
                  Reset
                </PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPressCustom={confirmInputHandler}>
                  Submit
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {flex: 1},
  rootContainer: {
    //flex: 1,
    //marginTop: 100,
    alignItems: 'center',
  },
  numberInput: {
    width: 50,
    height: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    color: Colors.accent500,
    borderBottomWidth: 2,
    marginVertical: 8,
    paddingTop: 2,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});
