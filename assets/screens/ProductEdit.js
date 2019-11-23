import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Container, Header, Left, Body, Right, Title, View, Icon, Button, Content, Item, Input, Text, Form, Picker, Textarea } from 'native-base';

import Styles from '../public/stylesheet/Styles';

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
                <View style={Styles.statusBar} />

                <Header style={Styles.colorTheme}>
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
                        <Text style={Styles.formTitleTop}>Product Name <Text style={Styles.formRequiredSysmbol}>*</Text> </Text>
                        <Item regular style={Styles.formBox}>
                            <Input value={ this.state.title } onChangeText={(title) => this.setState({title})} />
                        </Item>

                        <Text style={Styles.formTitle}>Product Category <Text style={Styles.formRequiredSysmbol}>*</Text> </Text>
                        <Form>
                            <Item regular picker style={Styles.formBox}>
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

                        <Text style={Styles.formTitle}>Product Description</Text>
                        <Form>
                            <View style={Styles.formBoxTextarea}>
                                <Textarea rowSpan={10} bordered placeholder="Add Some Description" style={{ paddingTop: 5 }} value={ this.state.description } onChangeText={(description) => this.setState({ description })} />
                            </View>
                        </Form>

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

export default connect(mapStateToProps)(ProductEdit);