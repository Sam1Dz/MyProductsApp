import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Title, View, Icon, Button, Item, Input, Text, Picker, Textarea, Form } from 'native-base';
import Constants from 'expo-constants';

import { connect } from 'react-redux';
import { addDataProducts } from '../public/redux/actions/ProductsAction'

class ProductAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: undefined,
            title: "",
            description: ""
        };
    }
    
    addProduct = () => {
        let title = this.state.title;
        let description = this.state.description;
        let category = this.state.selectedCategory;

        if (title != "" && category != undefined && category != 0) {
            this.props.dispatch(addDataProducts(
                {
                    title,
                    description,
                    category
                }
            ));
            this.props.navigation.pop();
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
                        <Title>Add Product</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon type="MaterialIcons" name='check' onPress={this.addProduct} />
                        </Button>
                    </Right>
                </Header>

                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                    <Content>
                        <Text style={{fontSize: 15, marginLeft: 5, marginBottom: 2, marginTop: 10, fontWeight: 'bold'}}>Product Name <Text style={{ fontSize: 15, lineHeight: 18, color: 'red' }}>*</Text> </Text>
                        <Item regular style={{marginLeft: 5, marginRight: 5, paddingRight: 5, marginBottom: 5}}>
                            <Input onChangeText={(title) => this.setState({title})} />
                        </Item>

                        <Text style={{fontSize: 15, marginLeft: 5, marginTop: 5, marginBottom: 2, fontWeight: 'bold'}}>Product Category <Text style={{ fontSize: 15, lineHeight: 18, color: 'red' }}>*</Text></Text>
                        <Form>
                            <Item regular picker style={{marginLeft: 5, marginRight: 5, paddingRight: 5, marginBottom: 5}}>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={ this.state.selectedCategory }
                                    onValueChange={(itemValue) => this.setState({ selectedCategory: itemValue })}
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
                        <View style={{marginLeft: 5, marginRight: 5, marginBottom: 5}}>
                            <Textarea rowSpan={11} bordered placeholder="Add Some Description" style={{ paddingTop: 5 }} onChangeText={(description) => this.setState({ description })} />
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

export default connect(mapStateToProps)(ProductAdd);