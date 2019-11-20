import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Container, Header, Left, Body, Right, Title, View, Icon, Button, Content, Item, Input, Text, Form, Picker, Textarea } from 'native-base';
import Constants from 'expo-constants';

import {connect} from 'react-redux';
import { editDataProducts } from '../public/redux/actions/ProductsAction'

class ProductEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.navigation.getParam('id'),
            selectedCategory: props.navigation.getParam('idCategory'),
            title: props.navigation.getParam('title'),
            description: props.navigation.getParam('description')
        };
    }

    editProduct = () => {
        let id = this.state.id;
        let idCategory = this.state.selectedCategory;
        let title = this.state.title;
        let description = this.state.description;

        for (dataCategory of this.props.categoryList.categories) {
            if (dataCategory.id === idCategory) {
                category = dataCategory.name;
              }
        }

        if (title != "" && idCategory != undefined && idCategory != 0) {
            this.props.dispatch(editDataProducts(id,
                {
                    title : title,
                    description: description,
                    category: idCategory
                }
            ));
            this.props.navigation.navigate("ProductsScreen");
        } else {
            alert("Form with red asterisk (*) can't be Empty!");
        }
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
                        <Title>Edit Product</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon type="MaterialIcons" name='check' onPress={this.editProduct} />
                        </Button>
                    </Right>
                </Header>

                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                    <Content>
                        <View style={{marginTop: 10}}>
                        
                            <Text style={{fontSize: 15, marginLeft: 5, marginBottom: 2, fontWeight: 'bold'}}>Product Name <Text style={{ fontSize: 15, lineHeight: 18, color: 'red' }}>*</Text> </Text>
                            <Item regular style={{marginLeft: 5, marginRight: 5, paddingRight: 5, marginBottom: 5}}>
                                <Input value={ this.state.title } onChangeText={(title) => this.setState({title})} />
                            </Item>

                            <Text style={{fontSize: 15, marginLeft: 5, marginTop: 5, marginBottom: 2, fontWeight: 'bold'}}>Product Category <Text style={{ fontSize: 15, lineHeight: 18, color: 'red' }}>*</Text> </Text>
                            <Form>
                                <Item regular picker style={{marginLeft: 5, marginRight: 5, paddingRight: 5, marginBottom: 5}}>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={ this.state.selectedCategory }
                                        onValueChange={(itemValue) => this.setState({selectedCategory: itemValue})}
                                    >
                                        <Picker.Item label="Select Category" value="0" key="0" />
                                        {
                                            this.props.categoryList.categories.map((item) => {
									            return (
										            <Picker.Item label={item.name} value={item.id} key={item.id} />
									            )
								            })
							            }
                                    </Picker>
                                </Item>
                            </Form>

                            <Text style={{fontSize: 15, marginLeft: 5, marginTop: 5, marginBottom: 2, fontWeight: 'bold'}}>Product Description</Text>
                            <Form>
                                <View style={{marginLeft: 5, marginRight: 5, marginBottom: 5}}>
                                    <Textarea rowSpan={10} bordered placeholder="Add Some Description" style={{ paddingTop: 5 }} value={ this.state.description } onChangeText={(description) => this.setState({ description })} />
                                </View>
                            </Form>

                        </View>
                    </Content>
                </KeyboardAvoidingView>
            </Container>
        );
    }
}

const mapStateToProps = state => {
	return {
		categoryList: state.CategoriesReducer
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

export default connect(mapStateToProps)(ProductEdit);