import React from 'react';
import { FlatList, ActivityIndicator, Alert } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Title, View, Icon, Button, Text, ListItem } from 'native-base';

import Styles from '../public/stylesheet/Styles';

import { connect } from 'react-redux';
import { getDataProducts } from '../public/redux/actions/ProductsAction'
import { deleteDataCategories } from '../public/redux/actions/CategoriesAction'

class CategoriesList extends React.Component {

    deleteCategory(id) {
        Alert.alert(
			'Delete Category',
			'Are you sure want to Delete this Category? (Products Data with this Category will be deleted too!)',
			[
				{ text: 'Cancel', onPress: () => {} },
                { text: 'Yes', onPress: () => 
                    { 
                        this.props.dispatch(deleteDataCategories(id))
                    }
                }
			]
		)
    }

    renderItem = ({ item }) => (
        <ListItem style={{ marginRight: 10 }} onLongPress={() => this.deleteCategory(item.id)} onPress={ () => this.props.navigation.push("CategoryEdit", item)}>
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
                            <Icon name="add" onPress={() => this.props.navigation.navigate('CategoryAdd')} />
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
