import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native'
import React from 'react'
import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { addData, eraseData } from '../../store/BirthdaySlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function Buttons() {
    const item = useSelector(state => state.birthday.data?.[0])
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())
    const [modalVisible, setModalVisible] = useState(false);

    const Dispatch = useDispatch()

    const addHandeler = () => {

        if (item) {

            setModalVisible(false)
            alert('User already added')
            return;
        }

        setModalVisible(false)

        let month = date.getMonth() + 1
        let day = date.getDate()


        let currentDate = new Date()
        let year = currentDate.getFullYear()
        console.log(month, day, year)
        let nextBirthDay = year + '-' + month + '-' + day
        const data = {
            userName: name,
            nextDob: nextBirthDay
        }
        Dispatch(addData(data))
        setName('')


    }
    const eraseHandeler=()=>{
        let id = item?.id
        Dispatch(eraseData(id))

    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttons}
                onPress={() => setOpen(true)}
            >
                <Text style={styles.txt}>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons} onPress={eraseHandeler}>
                <Text style={styles.txt}>Erase</Text>
            </TouchableOpacity>
            <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    setModalVisible(true)

                }}
                mode='date'
                onCancel={() => {
                    setOpen(false)
                }}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.containerModal}>

                    <View style={styles.modal}>
                        <Text>Enter your name</Text>
                        <TextInput placeholder='User Name' style={styles.input} value={name} onChangeText={(text) => setName(text)} />
                        <TouchableOpacity style={styles.btn} onPress={addHandeler}>
                            <Text style={{
                                textAlign: 'center',
                                color: 'white'
                            }}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    buttons: {
        flex: 1,
        alignContent: 'center',
        marginTop: 20
    },
    txt: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    modal: {
        height: 150,
        width: 300,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 20

    },
    containerModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    input: {
        borderBottomWidth: 1
    },
    btn: {
        backgroundColor: '#bde0fe',
        padding: 5,
        margin: 10,
        width: 50,
        borderRadius: 5
    }
})


