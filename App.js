import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from './colors';

export default function App() {

  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const work = () => setWorking(true);
  const travel = () => setWorking(false);
  const onChangeText = (payload) => {setText(payload)};
  const addToDo = () => {
    if(text === ""){
      return;
    }
    const newToDos = Object.assign({}, toDos, {
      [Date.now()]: {text, work: working}
    });
    setToDos(newToDos);
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
          placeholder={working ? "Add a To Do" : "Where do you want to go?"} // text input이 입력되기 전에 렌더되는 string
          value={text} // text input을 위해 보여줄 값.
          onSubmitEditing={addToDo} // text 입력이 끝냈을때 호출되는 콜백
          returnKeyType="done"
          style={styles.input}>
          </TextInput>
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
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 18,
  }
});
