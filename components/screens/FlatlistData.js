import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

const Header_Max_Height = 120;
const Header_Min_Height = 100;
const Scroll_Distance = Header_Max_Height - Header_Min_Height;

const DynamicHeader = ({ scrollOffsetY }) => {
    const animatedHeaderHeight = scrollOffsetY.interpolate({
        inputRange: [0, Scroll_Distance],
        outputRange: [Header_Max_Height, Header_Min_Height],
        extrapolate: 'clamp',
    });

    const animatedHeaderColor = scrollOffsetY.interpolate({
        inputRange: [0, Scroll_Distance],
        outputRange: ['#181D31', '#678983'],
        extrapolate: 'clamp',
    });

    return (
        <Animated.View
            style={[
                styles.header,
                {
                    height: animatedHeaderHeight,
                    backgroundColor: animatedHeaderColor,
                },
            ]}
        >
            <Text style={styles.title}>Dynamic Header</Text>
        </Animated.View>
    );
};

const FlatListData = () => {
    const scrollOffsetY = useRef(new Animated.Value(0)).current;

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.subtitle}>({item.id})</Text>
            <Text style={styles.subtitle}>({item.category})</Text>
        </View>
    );

    const renderFooter = () => {
        return loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
        ) : null;
    };

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const Data = async () => {
            try {
                setLoading(true);
                const res = await fetch('https://fakestoreapi.com/products');
                const json = await res.json();
                setData(json);
                console.log(data);
            } catch (error) {
                console.error("Error Facting Data", error);
            } finally {
                setLoading(false);
            }
        }
        Data();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <DynamicHeader scrollOffsetY={scrollOffsetY} />
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
                    { useNativeDriver: false }
                )}
                ListFooterComponent={renderFooter}
            />
        </View>
    );
};

export default FlatListData;

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 25,
    },
    title: {
        color: '#ffff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    card: {
        height: 100,
        backgroundColor: '#E6DDC4',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    subtitle: {
        color: '#181D31',
        fontWeight: 'bold',
    },
});
