import React from 'react';
import { FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Container, Header, Title, Right, Left, Body, View, Icon, Fab, Content, ListItem, Button, Text } from 'native-base';

import Styles from '../public/stylesheet/Styles';

import { connect } from 'react-redux';
import { getDataProducts, getDataProductsMore } from '../public/redux/actions/ProductsAction'
import { getDataCategories } from '../public/redux/actions/CategoriesAction'

class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshingData: false,
            page: 1
		}
    }

    produtsNextPage = () => {
        if(this.state.page < this.props.productsReducer.totalPage) {
            this.setState({
                page: this.state.page + 1
            }, () => {
                this.props.dispatch(getDataProductsMore(this.state.page));
            })
        }
    }

    componentDidMount() {
        this.props.dispatch(getDataProducts(this.state.page));
        this.props.dispatch(getDataCategories());
    }

    renderItem = ({ item }) => (
        <ListItem avatar style={{ paddingRight:5 }} onPress={ () => this.props.navigation.push("ProductDetail", item)}>
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
		this.setState({refreshingData: true, page: 1});
		this.props.dispatch(getDataProducts()).then(() => {
			this.setState({refreshingData: false});
        })
	}

    render() {
        return (
            <Container>

                <View style={Styles.statusBar} />

                <Header noLeft style={Styles.colorTheme}>
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
                        <Content refreshControl={ <RefreshControl refreshing={ this.state.refreshingData } onRefresh={ this.refreshData.bind(this) } /> }>
                            <View style={{ flex: 1 }}>
							    <FlatList
                                    data={ this.props.productsReducer.products }
                                    keyExtractor={(item) => item.id.toString()}
                                    onEndReached={this.produtsNextPage.bind(this)}
                                    onEndReachedThreshold={0.1}
                                    ListFooterComponent={() => this.props.productsReducer.isLoadingOnNextPage ? <ActivityIndicator style={{ marginTop: 5 }} size="large" color="#3C3369"/> : null }
                                    renderItem={this.renderItem}
							    />
						    </View>
                        </Content>
                    )
                }

                <Fab
					style={Styles.colorTheme}
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

export default connect(mapStateToProps)(ProductsList);
