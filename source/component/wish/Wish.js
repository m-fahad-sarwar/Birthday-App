import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Wish() {

  const data = useSelector(state => state.birthday.data?.[0])
  const name = data?.userName
  if (!name) {
    return (<>
      <View style={styles.bx}>


        <Text style={styles.txt}>User Name Birthday!</Text>
      </View>
    </>

    )
  }
  
return (
  <View style={styles.bx}>
    <Text style={styles.txt}>{name} Birthday!</Text>

  </View>
)


}


const styles = StyleSheet.create({
  txt: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30

  },
  bx: {
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: 'white'
  }

})