import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Item, Input, Icon, Text, View } from 'native-base';
import Constants from 'expo-constants';

export default class ProductsSearch extends React.Component {
    render() {
        return (
            <Container>
                <View style={style.statusBar} />

                <Header searchBar rounded style={style.colorTheme}>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search Products" />
                    </Item>
                </Header>

                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Icon type="MaterialIcons" name="warning" />
                    <Text>Feature still in Development</Text>
                </View>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    statusBar: {
        backgroundColor: "#3C3369",
        height: Constants.statusBarHeight,
    },
    colorTheme: {
        backgroundColor: "#3C3369"
    }
})