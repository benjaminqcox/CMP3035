import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/buttons';
import NumericInput from 'react-native-numeric-input'
import Timer from './Timer';

function Input(props) {
    const { title, maxValue, value, onChange } = props
    return (          
      <View style={styles.input}>
        <Text style={styles.subheading}>{title}</Text>
        <NumericInput
          style={{flex: 1}}
          type="plus-minus"
          value={value}
          onChange={onChange} 
          minValue={0} 
          maxValue={maxValue} 
          valueType="integer"
          totalWidth={150}
          totalHeight={70}
          rounded />
      </View>);
  }

export default function TimerInput(props) {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const { navigate } = props.navigation;

    return (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
              <Input key={`hours:${hours}`} title="Hours" maxValue={99} value={hours} onChange={value => setHours(value)}/>
              <Input key={`minutes:${minutes}`} title="Minutes" maxValue={59} value={minutes} onChange={value => setMinutes(value)}/>
              <Input key={`seconds:${seconds}`} title="Seconds" maxValue={59} value={seconds} onChange={value => setSeconds(value)}/> 
          </View>
          <View style={styles.buttonContainer}>
              <Button style={{backgroundColor: "#60615f"}} title="Reset" onPress={() => (setHours(0), setMinutes(0), setSeconds(0))} />

              <Button style={{backgroundColor: "#60bd31"}} title="Start" onPress={() => navigate('Timer', {'seconds': seconds + minutes * 60 + hours * 3600})} />
          </View>
        </View>
    );
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
      flexDirection: 'row',
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
