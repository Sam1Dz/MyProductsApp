import React from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Title, View, Subtitle, Icon, Button, Content, Text } from 'native-base';
import Constants from 'expo-constants';

import { connect } from 'react-redux';
import { deleteDataProducts } from '../public/redux/actions/ProductsAction'

class ProductsDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.navigation.getParam('id'),
            idCategory: props.navigation.getParam('category'),
            title: props.navigation.getParam('title'),
            category: props.navigation.getParam('categoryName'),
            description: props.navigation.getParam('description')
        }
    }

    deleteProduct() {
        Alert.alert(
			'Delete Product',
			'Are you sure want to Delete this Product?',
			[
				{ text: 'Cancel', onPress: () => {} },
				{ text: 'Yes', onPress: () => { this.props.dispatch(deleteDataProducts(this.state.id)), this.props.navigation.pop() } }
			]
		)
    }

    render() {
        return (
            <Container>
                <View style={style.statusBar} />

                <Header style={style.colorTheme}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{ this.state.title }</Title>
                        <Subtitle>{ this.state.category }</Subtitle>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.navigate("ProductsEdit", this.state)}>
                            <Icon type="MaterialIcons" name='edit' />
                        </Button>
                        <Button transparent onPress={() => this.deleteProduct()}>
                            <Icon type="MaterialIcons" name='delete' />
                        </Button>
                    </Right>
                </Header>

                <Content>
                    <View style={[style.box, {backgroundColor: '#FFFFFF', height: 83}]}>
                        <Text style={style.title}>Product Name</Text>
			            <Text style={style.description}>{ this.state.title }</Text>
                    </View>
                    <View style={[style.box, {backgroundColor: '#FFFFFF', height: 83}]}>
                        <Text style={style.title}>Product Category</Text>
			            <Text style={style.description}>{ this.state.category }</Text>
                    </View>
                    <View style={[style.box, {backgroundColor: '#FFFFFF', height: 290}]}>
                        <Text style={style.title}>Product Description</Text>
			            <Text style={style.description}>{ this.state.description }</Text>
                    </View>
                </Content>
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
    },
    box: {
        flex: 1,
		elevation: 2,
        height: Dimensions.get('window').width,
        margin: 5,
		borderRadius: 5,
	},
	title: {
		color: "#767096",
		fontSize: 17.5,
        fontWeight: 'bold',
        paddingTop: 5,
		paddingLeft: 10,
		paddingRight: 10,
	},
	description: {
		color: 'black',
		fontSize: 15,
		paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
	}
})

export default connect(mapStateToProps)(ProductsDetail);