import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TextInput, ActivityIndicator  } from 'react-native';
import React, { useState, useCallback} from 'react';
import axios from 'axios'

export default function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  
  const api = {
    key: 'cbb158de225501af49f730bf7b0e701c',
   baseUrl: 'http://api.openweathermap.org/data/2.5/',
  };

  const fetchDataHandler=useCallback(() => {
    setLoading(true);
    setInput('');
    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
    })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => {
        console.dir(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [api.key, input]);
 
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/bg.jpg')} resizeMode='cover' style={styles.image}>
        <View>
          <TextInput
            placeholder="Enter city name and press return..." style={styles.textInput}
            onChangeText={text => setInput(text)} placeholderTextColor={'#000'}
            onSubmitEditing={fetchDataHandler} value={input}
          />
        </View>

        {loading && (
          <View>
            <ActivityIndicator size={'large'} color={'#fff'} />
          </View>
        )}

        {data && (
          <View style={styles.info}>
            <Text style={ styles.txtCity}> {`${data?.name}, ${data?.sys?.country}`} </Text>
            <Text style={styles.txtDate}>{new Date().toLocaleString()}</Text>
            <Text style={styles.txtTemp}>{`${Math.round( data?.main?.temp,)} °C`}</Text>
            <Text style={styles.txtMinMax}>{`Min ${Math.round(data?.main?.temp_min,)} °C / Max ${Math.round(data?.main?.temp_max)} °C`}</Text>
          </View>
        )}

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {
    borderBottomWidth: 2,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 10,
    backgroundColor: '#cd45cd',
    fontSize: 19,
    fontWeight: '300',
    borderRadius: 16,
    borderBottomColor: '#df8e00',
  },
  txtCity: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  info: {
    alignItems: 'center',
  },
  txtDate: {
    color: '#fff',
    fontSize: 22,
    marginVertical: 10,
  },
  txtTemp: {
    fontSize: 45,
    color: '#fff',
    marginVertical: 10,
  },
  txtMinMax: {
    fontSize: 22,
    color: '#fff',
    marginVertical: 10,
    fontWeight: '500',
  },
});
