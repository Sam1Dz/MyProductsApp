import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Title, View, Icon, Button, Item, Input, Text, Picker, Textarea, Form } from 'native-base';

import Styles from '../public/stylesheet/Styles';

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
                <View style={Styles.statusBar} />

                <Header style={Styles.colorTheme}>
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
                        <Text style={Styles.formTitleTop}>Product Name <Text style={Styles.formRequiredSysmbol}>*</Text> </Text>
                        <Item regular style={Styles.formBox}>
                            <Input onChangeText={(title) => this.setState({title})} />
                        </Item>

                        <Text style={Styles.formTitle}>Product Category <Text style={Styles.formRequiredSysmbol}>*</Text></Text>
                        <Form>
                            <Item regular picker style={Styles.formBox}>
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
                        <Text style={Styles.formTitle}>Product Description</Text>
                        <View style={Styles.formBoxTextarea}>
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

export default connect(mapStateToProps)(ProductAdd);