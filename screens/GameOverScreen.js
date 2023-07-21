import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';
import PrimaryButton from '../components/ui/PrimaryButton';
export default function GameOverScreen({
  roundsNumber,
  userNumber,
  onStartNewGame,
}) {
  const {width, height} = useWindowDimensions();

  let imageSize = 300;

  if (width < 380) {
    imageSize = 150;
  }

  if (height < 400) {
    imageSize = 80;
  }

  const imageStyle = {
    height: imageSize,
    width: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView>
      <View style={styles.rootContainer}>
        <Title>GameOverScreen</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require('../assets/images/success.png')}
          />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{' '}
          rounds to guess number{' '}
          <Text style={styles.highlight}>{userNumber}.</Text>
        </Text>
        <PrimaryButton onPressCustom={onStartNewGame}>
          Start New Game
        </PrimaryButton>
      </View>
    </ScrollView>
  );
}
// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  rootContainer: {
    //flex: 1,
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    // height: deviceWidth < 380 ? 150 : 300,
    // width: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150, //borderRadius must be half the device width and height
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  highlight: {
    color: Colors.primary500,
  },
  summaryText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
    marginHorizontal: 12,
  },
});
