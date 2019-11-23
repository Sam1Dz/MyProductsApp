import React from 'react';
import { Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Title, View, Subtitle, Icon, Button, Content, Text } from 'native-base';

import Styles from '../public/stylesheet/Styles';

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
                <View style={Styles.statusBar} />

                <Header style={Styles.colorTheme}>
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
                    <View style={[Styles.box, {backgroundColor: '#FFFFFF', height: 83}]}>
                        <Text style={Styles.title}>Product Name</Text>
			            <Text style={Styles.description}>{ this.state.title }</Text>
                    </View>
                    <View style={[Styles.box, {backgroundColor: '#FFFFFF', height: 83}]}>
                        <Text style={Styles.title}>Product Category</Text>
			            <Text style={Styles.description}>{ this.state.category }</Text>
                    </View>
                    <View style={[Styles.box, {backgroundColor: '#FFFFFF', height: 290}]}>
                        <Text style={Styles.title}>Product Description</Text>
			            <Text style={Styles.description}>{ this.state.description }</Text>
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

export default connect(mapStateToProps)(ProductsDetail);