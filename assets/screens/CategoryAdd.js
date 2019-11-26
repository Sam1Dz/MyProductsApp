import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Title, View, Icon, Button, Item, Input, Text, Picker, Textarea, Form } from 'native-base';

import Styles from '../public/stylesheet/Styles';

import { connect } from 'react-redux';
import { addDataCategories } from '../public/redux/actions/CategoriesAction'

class CategoryAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
    }
    
    addCategory = () => {
        let name = this.state.name;
        
        if (name != "") {
            this.props.dispatch(addDataCategories({
                name
            }));
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
                        <Title>Add Category</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon type="MaterialIcons" name='check' onPress={this.addCategory} />
                        </Button>
                    </Right>
                </Header>

                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                    <Content>
                        <Text style={Styles.formTitleTop}>Category Name <Text style={Styles.formRequiredSysmbol}>*</Text> </Text>
                        <Item regular style={Styles.formBox}>
                            <Input onChangeText={ (name) => this.setState({name}) } />
                        </Item>

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

export default connect(mapStateToProps)(CategoryAdd);