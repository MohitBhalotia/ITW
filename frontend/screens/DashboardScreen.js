import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';

const DashboardScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Clear user data and token from storage
    // You might want to use AsyncStorage or a state management solution
    navigation.replace('Login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Button mode="outlined" onPress={handleLogout}>
          Logout
        </Button>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.welcomeText}>Welcome to your Dashboard!</Text>
          <Text style={styles.subText}>
            This is where you'll see your personalized content and manage your account.
          </Text>
        </Card.Content>
      </Card>

      {/* Add more dashboard content here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#666',
  },
});

export default DashboardScreen; 