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
} from 'react-native';
import api from './services/api';
import './ReactotronConfig';

export default class App extends Component {
  state = {
    errorMessage: null,
  };

  signIn = async () => {
    try {
      const response = await api.post('/auth/authenticate', {
        email: 'rb.mateus.araujo@gmail.com',
        password: '12345677',
      });

      console.log(response);

      const { user, token } = response.data;

      await AsyncStorage.multiSet([
        ['@CodeApi:token', token],
        ['@CodeApi:user', JSON.stringify(user)],
      ]);
    } catch (response) {
      this.setState({ errorMessage: response.data.error });
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
