import React from 'react';
import { FlatList } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Title, View, Icon, Button, Text, ListItem } from 'native-base';

import Styles from '../public/stylesheet/Styles';

import { connect } from 'react-redux';

class CategoriesList extends React.Component {
    renderItem = ({ item }) => (
        <ListItem style={{ marginRight: 10 }} >
            <Text numberOfLines={1} style={{fontWeight: 'bold'}}>{item.name}</Text>
        </ListItem>
    )

    render() {
        return (
            <Container>
                <View style={Styles.statusBar} />

                <Header style={Styles.colorTheme}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Category List</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name="add" onPress={this.toggleModal} />
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

export default connect(mapStateToProps)(CategoriesList);
