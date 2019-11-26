import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Title, View, Icon, Button, Item, Input, Text, Picker, Textarea, Form } from 'native-base';

import Styles from '../public/stylesheet/Styles';

import { connect } from 'react-redux';
import { editDataCategories } from '../public/redux/actions/CategoriesAction'

class CategoryEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.navigation.getParam('id'),
            name: props.navigation.getParam('name')
        };
    }
    
    editCategory = () => {
        let id = this.state.id;
        let name = this.state.name;
        
        if (name != "") {
            this.props.dispatch(editDataCategories(id, { name } ));
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
                        <Title>Edit Category</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon type="MaterialIcons" name='check' onPress={this.editCategory} />
                        </Button>
                    </Right>
                </Header>

                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                    <Content>
                        <Text style={Styles.formTitleTop}>Category Name <Text style={Styles.formRequiredSysmbol}>*</Text> </Text>
                        <Item regular style={Styles.formBox}>
                            <Input value={this.state.name} onChangeText={ (name) => this.setState({name}) } />
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

export default connect(mapStateToProps)(CategoryEdit);