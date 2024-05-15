import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>FlatList Data with API</Text>
        <Button title="Check Task" onPress={() => navigation.navigate("FlatlistData")} />
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Image select from gallery and Upload into Server</Text>
        <Button title="Check Task" onPress={() => navigation.navigate("ImageUpload")} />
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>AudioPlayer</Text>
        <Button title="Check Task" onPress={() => navigation.navigate("AudioPlayer")} />
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>User CRUD Thorugh Redux</Text>
        <Button title="Check Task" onPress={() => navigation.navigate("UserList")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Welcome;
