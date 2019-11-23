import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
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
    },
    formTitleTop: {
        fontSize: 15,
        marginLeft: 5,
        marginBottom: 2,
        marginTop: 10,
        fontWeight: 'bold'
    },
    formTitle: {
        fontSize: 15,
        marginLeft: 5,
        marginBottom: 2,
        marginTop: 5,
        fontWeight: 'bold'
    },
    formBox: {
        marginLeft: 5,
        marginRight: 5,
        paddingRight: 5,
        marginBottom: 5
    },
    formBoxTextarea: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5
    },
    formRequiredSysmbol: {
        fontSize: 15,
        lineHeight: 18,
        color: 'red'
    }
});