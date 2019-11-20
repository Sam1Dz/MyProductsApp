import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Container, Header, Left, Body, Right, Title, View, Icon, Fab, Content, ListItem, Button, Text } from 'native-base';
import Constants from 'expo-constants';

import { connect } from 'react-redux';
import { getDataProducts } from '../public/redux/actions/ProductsAction'
import { getDataCategories } from '../public/redux/actions/CategoriesAction'

class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			refreshingData: false
		}
    }

    componentDidMount() {
        this.props.dispatch(getDataProducts());
        this.props.dispatch(getDataCategories());
    }

    renderItem = ({ item }) => (
        <ListItem avatar style={{ paddingRight:5 }} onPress={ () => this.props.navigation.navigate("ProductDetail", item)}>
            <Left>
                <Button small style={{ backgroundColor: "#3C3369" }}>
                    <Icon active name="apps" />
                </Button>
            </Left>
            <Body>
                <Text numberOfLines={1} style={{fontWeight: 'bold'}}>{item.title}</Text>
				<Text note numberOfLines={1}>{item.categoryName}</Text>
            </Body>
        </ListItem>
    )

    refreshData = () => {
		this.setState({refreshingData: true});
		this.props.dispatch(getDataProducts()).then(() => {
			this.setState({refreshingData: false});
		})
	}

    render() {
        return (
            <Container>
                <View style={style.statusBar} />

                <Header noLeft style={style.colorTheme}>
                    <Left/>
                    <Body>
                        <Title>Product List</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon type="MaterialCommunityIcons" name='magnify' onPress={ () => this.props.navigation.navigate("ProductsSearch") } />
                        </Button>
                        <Button transparent>
                            <Icon type="MaterialIcons" name="list" onPress={ () => this.props.navigation.navigate("CategoriesScreen") } />
                        </Button>
                    </Right>
                </Header>

                {
                    this.props.productsReducer.isLoading ?
                    (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size="large" color="#3C3369"/>
                            <Text style={{fontWeight: 'bold'}}>Loading</Text>
                        </View>
                    )
                    :
                    this.props.productsReducer.isError ? 
                    (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{ marginBottom: 5 }}>Error when loading Product Data!</Text>
                            <Button style={style.colorTheme} onPress={ this.refreshData }><Text> Refresh </Text></Button>
                        </View>
                    )
                    :
                    (
                        <Content>
                            <View style={{ flex: 1 }}>
							    <FlatList
                                    data={ this.props.productsReducer.products }
                                    keyExtractor={(item) => item.id.toString()}
                                    refreshControl={
										<RefreshControl
											refreshing={ this.state.refreshingData }
											onRefresh={ this.refreshData }
										/>
									}
								    renderItem={this.renderItem}
							    />
						    </View>
                        </Content>
                    )
                }

                <Fab
					style={style.colorTheme}
                    position="bottomRight"
                    onPress={() => this.props.navigation.navigate('ProductsAdd')}
				>
                    <Icon name="add"/>
				</Fab>
            </Container>
        );
    }
}

const mapStateToProps = state => {
	return {
		productsReducer: state.ProductsReducer
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

export default connect(mapStateToProps)(ProductsList);
