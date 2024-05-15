// UserList.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, FlatList, Button, TextInput, Modal } from 'react-native';
import { addUser, updateUser, deleteUser } from '../redux/userSlice';

const UserList = () => {
  const users = useSelector(state => state.user.users);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [userIdToUpdate, setUserIdToUpdate] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleEditUser = (userId, currentName) => {
    setUserIdToUpdate(userId);
    setName(currentName);
    setShowEditModal(true);
  };

  const handleUpdateUser = () => {
    dispatch(updateUser({ id: userIdToUpdate, newData: { name } }));
    setShowEditModal(false);
  };

  const handleAddUser = () => {
    if (name.trim() !== '') {
      dispatch(addUser({ id: Math.random().toString(), name }));
      setName('');
      setShowAddModal(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
      <Text>{item.name}</Text>
      <Button title="Edit" onPress={() => handleEditUser(item.id, item.name)} />
      <Button title="Delete" onPress={() => handleDeleteUser(item.id)} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Modal visible={showEditModal} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            style={{ width: '80%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            onChangeText={setName}
            value={name}
            placeholder="Enter new name"
          />
          <Button title="Update" onPress={handleUpdateUser} />
          <Button title="Cancel" onPress={() => setShowEditModal(false)} />
        </View>
      </Modal>
      <Modal visible={showAddModal} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            style={{ width: '80%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            onChangeText={setName}
            value={name}
            placeholder="Enter name"
          />
          <Button title="Add User" onPress={handleAddUser} />
          <Button title="Cancel" onPress={() => setShowAddModal(false)} />
        </View>
      </Modal>
      <Button title="Add User" onPress={() => setShowAddModal(true)} />
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default UserList;
