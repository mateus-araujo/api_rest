/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
  Alert,
} from 'react-native';
import api from './services/api';
import './ReactotronConfig';
import Reactotron from 'reactotron-react-native';

export default class App extends Component {
  state = {
    loggedInUser: null,
    errorMessage: '',
  };

  signIn = async () => {
    try {
      const response = await api.post('/auth/authenticate', {
        email: 'rb.mateus.araujo@gmail.com',
        password: '1234567',
      });

      Reactotron.log(response);

      const { token, user } = response.data;

      await AsyncStorage.multiSet([
        ['@CodeApi:token', token],
        ['@CodeApi:user', JSON.stringify(user)],
      ]);

      this.setState({ loggedInUser: user });

      Alert.alert('Logado com sucesso!');
    } catch (err) {
      Reactotron.log(err);
      this.setState({ errorMessage: 'Erro!' });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        { !!this.state.errorMessage && <Text>{ this.state.errorMessage }</Text> }
        <Button onPress={this.signIn} title="Entrar" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
