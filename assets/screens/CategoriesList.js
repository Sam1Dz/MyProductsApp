import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Title, View, Icon, Fab, Footer, FooterTab, Button, Text } from 'native-base';
import Constants from 'expo-constants';

export default class CategoriesList extends React.Component {
    render() {
        return (
            <Container>
                <View style={style.statusBar} />

                <Header noLeft style={style.colorTheme}>
                    <Left/>
                    <Body>
                        <Title>Category List</Title>
                    </Body>
                    <Right />
                </Header>

                <View style={{ flex: 1 }}>
                    <Fab
					    style={style.colorTheme}
					    position="bottomRight"
					>
                        <Icon name="add"/>
				    </Fab>
                </View>

                <Footer>
                    <FooterTab style={style.colorTheme}>
                        <Button vertical onPress={() => this.props.navigation.navigate('ProductsScreen')}>
                            <Icon name="apps" />
                            <Text>Products</Text>
                        </Button>
                        <Button vertical active style={style.colorTheme}>
                            <Icon type="MaterialIcons" name="list" />
                            <Text>Categories</Text>
                        </Button>
                    </FooterTab>
                </Footer>
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
