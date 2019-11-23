import React from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { Container, Header, Left, Body, View, Icon, Content, ListItem, Button, Text, Item, Input } from 'native-base';
import lodash from 'lodash';

import Styles from '../public/stylesheet/Styles';

import { connect } from 'react-redux';
import { searchDataProducts } from '../public/redux/actions/ProductsAction'

class ProductsSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            page: 1
		}
    }

    search = (value) => {
        this.setState.search = value;
        this.props.dispatch(searchDataProducts(value));
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

    render() {
        return (
            <Container>
                <View style={Styles.statusBar} />

                <Header searchBar rounded style={Styles.colorTheme}>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search Products" onChangeText={lodash.debounce(this.search, 500)} />
                    </Item>
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
                            <Button style={styles.colorTheme} onPress={ this.refreshData }><Text> Refresh </Text></Button>
                        </View>
                    )
                    :
                    (
                        <Content>
                            <View style={{ flex: 1 }}>
							    <FlatList
                                    data={ this.props.productsReducer.searchProducts }
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
		productsReducer: state.ProductsReducer
	}
}

export default connect(mapStateToProps)(ProductsSearch);