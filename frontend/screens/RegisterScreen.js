import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import axios from 'axios';
import { 
  getErrorMessage, 
  validateEmail, 
  validatePassword, 
  validateUsername 
} from '../utils/errorHandler';
import API_URL from '../config/api';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const validateForm = () => {
    if (!username || !email || !password) {
      setError('Please fill in all fields');
      return false;
    }
    if (!validateUsername(username)) {
      setError('Username must be at least 3 characters long');
      return false;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      setVisible(true);
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
      });

      // Store the token and user data
      // You might want to use AsyncStorage or a state management solution
      const { token, user } = response.data;
      
      // For now, we'll just log the data
      console.log('Registration successful:', { token, user });
      
      // Navigate to Dashboard
      navigation.replace('Dashboard');
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      setVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register</Text>
      
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        mode="outlined"
        style={styles.input}
        autoCapitalize="none"
        disabled={loading}
        error={error.includes('username')}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        disabled={loading}
        error={error.includes('email')}
      />
      
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        style={styles.input}
        secureTextEntry
        disabled={loading}
        error={error.includes('password')}
      />
      
      <Button
        mode="contained"
        onPress={handleRegister}
        style={styles.button}
        loading={loading}
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </Button>
      
      <Button
        mode="text"
        onPress={() => navigation.navigate('Login')}
        style={styles.button}
        disabled={loading}
      >
        Already have an account? Login
      </Button>

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Close',
          onPress: () => setVisible(false),
        }}
        duration={3000}
        style={styles.snackbar}
      >
        {error}
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  snackbar: {
    backgroundColor: '#ff5252',
  },
});

export default RegisterScreen; 