import React from 'react'
import { Text } from 'react-native'
import { useSelector } from 'react-redux'
import moment from 'moment'
import CountDown from 'react-native-countdown-component'
import { LogBox } from "react-native";

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

export default function Timer(props) {
  const data = useSelector(state => state.birthday.data)?.[0]
  console.log(data, 'timer');
  const dob = data?.nextDob
  var given = moment(dob, "YYYY-MM-DD");
  var current = moment().startOf('time');

  //Difference in number of days
  const seconds = moment.duration(given.diff(current)).asSeconds();

  console.log(seconds)
  if (!seconds) {

    return (<>
      <Text style={{
        color: 'white', fontSize: 30, textAlign: 'center', borderBottomWidth: 1,
        paddingBottom: 10,
        borderBottomColor: 'white'
      }}>Time left</Text>

      <CountDown
        key={1}
        size={30}
        digitStyle={{ backgroundColor: '#4895ef' }}
        digitTxtStyle={{ color: 'white' }}
        timeToShow={['D', 'H', 'M', 'S']}
        timeLabels={{ m: 'Minutes', s: 'Seconds', d: 'Days', h: 'Hours' }}
        timeLabelStyle={{ color: 'white' }}
      />
    </>)
  }




return (<>
  <Text style={{
    color: 'white', fontSize: 30, textAlign: 'center', borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: 'white'
  }}>Time left</Text>

  <CountDown
    until={seconds}
    size={30}
    onFinish={() => props.finish(true)}
    digitStyle={{ backgroundColor: '#4895ef' }}
    digitTxtStyle={{ color: 'white' }}
    timeToShow={['D', 'H', 'M', 'S']}
    timeLabels={{ m: 'Minutes', s: 'Seconds', d: 'Days', h: 'Hours' }}
    timeLabelStyle={{ color: 'white' }}
  />
</>
)
}