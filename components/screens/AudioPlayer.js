import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Button, ActivityIndicator, Text } from 'react-native';
import TrackPlayer from 'react-native-track-player';

const AudioPlayer = () => {
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        async function setup() {
            await TrackPlayer.setupPlayer();

            await TrackPlayer.add({
                id: 'track1',
                url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3', 
                title: 'Sample Track',
                artist: 'Unknown Artist',
            });

            setIsPlayerReady(true);
        }

        setup();
    }, []);

    useEffect(() => {
        const checkPlaybackState = async () => {
            console.log('Checking playback state...');
            const state = await TrackPlayer.getState();
            console.log('Playback state:', state);
            setIsPlaying(state === TrackPlayer.STATE_PLAYING);
        };

        const listener = TrackPlayer.addEventListener('playback-state', checkPlaybackState);

        return () => {
            console.log('Removing playback state listener...');
            listener.remove();
        };
    }, []);

    const togglePlayback = async () => {
        if (isPlaying) {
            await TrackPlayer.pause();
            setIsPlaying(false);
        } else {
            await TrackPlayer.play();
            setIsPlaying(true);
        }
    };

    if (!isPlayerReady) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#bbb" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <Text>Audio Music</Text>
                <Button title={isPlaying ? 'Pause' : 'Play'} onPress={() => togglePlayback()} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    buttonContainer: {
        alignItems: 'center'
    }
});

export default AudioPlayer;
