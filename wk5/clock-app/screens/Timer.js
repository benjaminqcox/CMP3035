import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import Button from '../components/buttons';
import { useFonts, ChakraPetch_400Regular } from '@expo-google-fonts/dev';

const formatNumeric = (x) => ('0' + x).slice(-2)

export default function Timer(props) {
  const { navigate } = props.navigation;

  // Retrieve seconds from route params
  const [seconds, setSeconds] = useState(props.route.params.seconds);

  // startTime stores the time the timer started.
  const [startTime, setStartTime] = useState(0);

  // isPaused controls whether the timer is on/off
  const [isPaused, setPause] = useState(false);
  let [fontsLoaded] = useFonts({
    ChakraPetch_400Regular,
  });

  // TODO: Add a useEffect function that updates the timer when seconds > 0
  // and creates an alert when seconds = 0 to navigate back to the timer input screen
  useEffect(() => {
    if (seconds === 0) {
      Alert.alert('Timer finished!', '', [{text: 'Okay', onPress: () => navigate('TimerInput')}])
    }
    else if (!isPaused) {
      setTimeout(() => setSeconds(seconds-1), 1000)
    }
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </ View>
    );
  }
  else {
    return ( 
      <View style={styles.container}>
        <View style={styles.clock}>
          <Text style={styles.digits}>{formatNumeric(Math.floor(seconds/3600))}:{formatNumeric(Math.floor((seconds%3600)/60))}:{formatNumeric(seconds%60)}</Text>
        </View>
        <View style={styles.buttonContainer}>
           <Button 
            style={{backgroundColor: "#60615f"}}
            title="Reset"
            onPress={() => (setPause(true), navigate('TimerInput'))} />
           <Button
            style={{backgroundColor: isPaused ? "#60bd31" : "#ed3b53"}}
            title={isPaused ? "Start" : "Pause"}
            onPress={() => (setPause(!isPaused))} />
        </View>
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'row'
  },
  inputContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    flex: 3,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  },
  subheading: {
    fontSize: 30,
    flex: 1
  },
  clock: {
    flex: 3,
    justifyContent: 'center'
  },
  digits: {
    fontFamily: 'ChakraPetch_400Regular',
    fontSize: 60
  }
});