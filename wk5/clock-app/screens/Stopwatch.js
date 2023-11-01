import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Button from '../components/buttons';
import { useFonts, ChakraPetch_400Regular } from '@expo-google-fonts/dev';

// format numbers as strings such that 2 -> '02'
const formatNumeric = (x) => ('0' + x).slice(-2)

export default function Stopwatch() {
  let [fontsLoaded] = useFonts({
    ChakraPetch_400Regular,
  });

  // centiseconds are equivalent to seconds/100.
  const [centisecs, setCentisecs] = useState(0);

  // isCounting controls whether the stopwatch is on/off. 
  const [isCounting, setStartStop] = useState(false);

  // startTime stores the time the stopwatch started.
  const [startTime, setStartTime] = useState(0);
  

  useEffect(() => {
    if (isCounting) {
      setTimeout(() => setCentisecs(Math.floor((Date.now() - startTime)/10)), 10);
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
          <Text style={styles.digits}>{formatNumeric(Math.floor(centisecs/6000))}:{formatNumeric(Math.floor((centisecs/100)%60))}.{formatNumeric(centisecs%100)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={{backgroundColor: "#60615f"}}
            title="Reset" 
            onPress={() => (setStartStop(false), setTimeout(() => setCentisecs(0), 10)) } />
          <Button 
            style={{backgroundColor: isCounting ? "#ed3b53" : "#60bd31"}}
            title={isCounting ? "Stop" : "Start"}
            onPress={() => (setStartStop(!isCounting), setStartTime(Date.now()), 10)} />
        </View>
      </View>
    );
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
  clock: {
    flex: 3,
    justifyContent: 'center'
  },
  digits: {
    fontFamily: 'ChakraPetch_400Regular',
    fontSize: 60
  }
});
