import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Title, View, Icon, Button, Text, ListItem } from 'native-base';
import Constants from 'expo-constants';

import { connect } from 'react-redux';

class CategoriesList extends React.Component {
    renderItem = ({ item }) => (
        <ListItem avatar style={{ paddingRight:5 }} >
            <Left>
                <Button small style={{ backgroundColor: "#3C3369" }}>
                    <Icon type="MaterialIcons" name='edit' />
                </Button>
            </Left>
            <Body>
                <Text numberOfLines={1} style={{fontWeight: 'bold'}}>{item.name}</Text>
                <Text note> </Text>
            </Body>
        </ListItem>
    )

    render() {
        return (
            <Container>
                <View style={style.statusBar} />

                <Header noLeft style={style.colorTheme}>
                    <Left/>
                    <Body>
                        <Title>Category List</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name="add" />
                        </Button>
                    </Right>
                </Header>

                {
                    this.props.categoriesReducer.isLoading ?
                    (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size="large" color="#3C3369"/>
                            <Text style={{fontWeight: 'bold'}}>Loading</Text>
                        </View>
                    )
                    :
                    this.props.categoriesReducer.isError ? 
                    (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{ marginBottom: 5 }}>Error when loading Category Data!</Text>
                        </View>
                    )
                    :
                    (
                        <Content>
                            <View style={{ flex: 1 }}>
							    <FlatList
                                    data={ this.props.categoriesReducer.categories }
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={this.renderItem}
							    />
						    </View>
                        </Content>
                    )
                }
            </Container>
        );
    }
}

const mapStateToProps = state => {
	return {
		categoriesReducer: state.CategoriesReducer
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

export default connect(mapStateToProps)(CategoriesList);
