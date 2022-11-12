import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from './colors';

export default function App() {

  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const STORAGE_KEY = '@toDos';

  useEffect(()=> {
    loadToDos();
  }, []);

  const work = () => setWorking(true);
  const travel = () => setWorking(false);
  const onChangeText = (payload) => {setText(payload)};

  const saveToDos = async (value) => {
    try{
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    } catch (e) {
      // saving error
    }
  };

  const loadToDos = async (value) => {
    try{
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      console.log(s);
      jsonValue !== null ? setToDos(JSON.parse(jsonValue)) : null;  // null이 아니라면 json으로 바꾼 값들을 todo의 상태값으로 업뎃!

      setToDos(JSON.parse(jsonValue));
    } catch (e) {
      // saving error
    }
  }
  
  const addToDo = async () => { // async 붙여주기.
    if(text === ""){
      return;
    }
    const newToDos = Object.assign({}, toDos, {
      [Date.now()]: {text, working},
    });
    setToDos(newToDos);
    await saveToDos(newToDos); // await 붙여주기.
    setText(""); // 텍스트 input 초기화
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color: working ? "white" : theme.grey}}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color: !working ? "white" : theme.grey}}>Travel</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          onChangeText={onChangeText} // text input의 텍스트가 바뀔때 호출되는 콜백. 바뀐 텍스트는 단 하나의 문자열로 전달되어짐.
          placeholder={working ? "What do you have to do?" : "Where do you want to go?"} // text input이 입력되기 전에 렌더되는 string
          value={text} // text input을 위해 보여줄 값.
          onSubmitEditing={addToDo} // text 입력이 끝냈을때 호출되는 콜백
          returnKeyType="done"
          style={styles.input}
        />
        <ScrollView>
          {Object.keys(toDos).map((key) => 
            toDos[key].working === working ? (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
            </View>
            ) : null
          )}  
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    color: "white",
    fontWeight: "600",
  },
  input : {
    backgroundColor : "white",
    paddingVertical: 15, // 위아래
    paddingHorizontal: 20, // 좌우
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  }
});
