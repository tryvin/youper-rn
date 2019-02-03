import React, {Component} from 'react';
import { connect } from 'react-redux';

import {View, Text} from 'react-native';

import UserAvatar from '../shared/UserAvatar';
import NotificationsIcon from '../shared/NotificationsIcon';

import mainStyle from '../baseStyle';

import { loadUserInformation } from '../../redux';

class MainScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: (
                <UserAvatar />
            ),
            headerRight: (
                <NotificationsIcon navigation={navigation}/>
            ),
        }
    };

    componentDidMount() {
        this.props.dispatch(loadUserInformation());
    }

    render() {
        return (
            <View style={mainStyle.mainView}>
            </View>
        )
    }
}

mapStateToProps = (state) => {
    return {
        userInformation: state.userInformation
    }
}

export default connect(mapStateToProps)(MainScreen);
