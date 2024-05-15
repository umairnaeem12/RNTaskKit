import React, { useState } from 'react';
import { View, Button, Image, Alert, PermissionsAndroid } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';


const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  console.log(selectedImage);
  const [avatarURL, setAvatarURL] = useState(null);

  // const handleImageSelect = () => {
  //   launchImagePicker();
  // };
  const handleImageSelect = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission Needed',
          message: 'This app needs access to your photo gallery.',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchImagePicker();
      } else {
        console.log('Gallery permission denied');
      }
    } catch (error) {
      console.error('Error requesting permission', error);
    }
  };

  const launchImagePicker = () => {
    launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log(response);
        setSelectedImage(response.assets[0].uri);
      }
    });
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      Alert.alert('No Image Selected', 'Please select an image before uploading');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: selectedImage,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      const response = await fetch('https://api.escuelajs.co/api/v1/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 201) {
        const data = await response.json();
        setAvatarURL(data?.location);
        Alert.alert('Image Uploaded', 'Image successfully uploaded to the server');
      } else {
        Alert.alert('Upload Failed', 'Failed to upload image. Please try again later.');
      }
    } catch (error) {
      console.error('Error uploading image', error);
      Alert.alert('Error', 'Failed to upload image. Please try again later.');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, marginBottom: 10 }} />}
      {avatarURL && <Image source={{ uri: avatarURL }} style={{ width: 200, height: 200, marginBottom: 10 }} />}
      <Button title="Select Image" onPress={handleImageSelect} />
      <Button title="Upload Image" onPress={handleImageUpload} />
    </View>
  );
};

export default ImageUpload;
