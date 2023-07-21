import {
  Text,
  StyleSheet,
  View,
  Alert,
  FlatList,
  useWindowDimensions,
} from 'react-native';
//import { FlatList } from 'react-native-gesture-handler';
import Title from '../components/ui/Title';
import {useEffect, useState} from 'react';
//import {Ionicons} from '@expo/vector-icons';

import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomNumber(min, max, exclude) {
  let rndmNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndmNum === exclude) generateRandomNumber(min, max, exclude);
  else return rndmNum;
}

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({userNumber, onGameOver}) {
  const initialGuess = generateRandomNumber(1, 100, userNumber);
  //using 100 as max bcs random method excludes boundaries so 100 will be not considered
  //(on course) hard coded  minB & maxB as 1 & 100 bcs the rndNum func is executed even if
  //min and max have become same the initialGuess gets calculated before the useEffect (useEffect runs after the func comp is exectued)
  //again when the GameScreen component is rerendered
  //anyways the initialGuess is calculated only once (alternatively we could have used useMemo)
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRoundsList, setGuessRoundsList] = useState([initialGuess]); //list for guesses
  const {height, width} = useWindowDimensions();
  useEffect(() => {
    if (userNumber === currentGuess) {
      onGameOver(guessRoundsList.length);
    }
  }, [userNumber, currentGuess, onGameOver]);
  //adding all used values as dependencies which means that if any of these values change then the function will be triggered

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []); //runs only once when the compenent is loaded

  function nextGuessHandler(direction) {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert('Dont lie!', 'Wrong Instruction', [
        {text: 'Try again', style: 'cancel'},
      ]);
      return;
    }
    if (direction === 'lower') {
      maxBoundary = currentGuess; //the next guess will have max boundary of the current guess so the gueess will be lower
      //the maxboundary should actually be currentGuess - 1 but the randNum func already excludes the higher boundary num
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNum = generateRandomNumber(
      minBoundary,
      maxBoundary,
      currentGuess,
    );
    setCurrentGuess(newRndNum);
    setGuessRoundsList(prevGuessRounds => [newRndNum, ...prevGuessRounds]); //adding new guess at front, (prevGuessRounds) is just name for our props
    //console.log(guessRoundsList);
  }
  const guessRoundsListLength = guessRoundsList.length;
  let content = (
    <>
      <View style={styles.numContainer}>
        <NumberContainer>{currentGuess}</NumberContainer>
      </View>

      <Card>
        <InstructionText style={styles.instructionText}>
          {/* this style prop is customly */}
          Higher or Lower
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPressCustom={nextGuessHandler.bind(this, 'lower')}>
              <Text style={styles.buttonText}>-</Text>
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPressCustom={nextGuessHandler.bind(this, 'greater')}>
              <Text style={styles.buttonText}>+</Text>
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPressCustom={nextGuessHandler.bind(this, 'lower')}>
              <Text style={styles.buttonText}>-</Text>
            </PrimaryButton>
          </View>
          <View style={styles.numContainer}>
            <NumberContainer>{currentGuess}</NumberContainer>
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPressCustom={nextGuessHandler.bind(this, 'greater')}>
              <Text style={styles.buttonText}>+</Text>
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }
  return (
    <View style={styles.screen}>
      <Title>Opponent's Screen</Title>
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRoundsList}
          renderItem={itemData => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              latestGuess={itemData.item}
            />
          )}
          keyExtractor={item => item}
          // using the item i.e. the guessed num as key bcs it is going to be unique anyways
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 24,
    height: '100%',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 24,
  },
  buttonText: {
    fontSize: 24,
  },
  listContainer: {
    flex: 1,
    padding: 8,
  },
  numContainer: {
    marginTop: 10,
    //marginBottom: -20,
  },
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
