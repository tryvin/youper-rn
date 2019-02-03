import React, {Component} from 'react';
import { connect } from 'react-redux';

import { View, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import UserService from '../services/UserService';

/*
* In this component I'm introducing side-effects, but for the same of
* keeping it simple, I will do the avatar upload, and rest query here
*/

const bellStyle = StyleSheet.create({
    pendingView: {
        position: 'absolute',
        top: -3,
        right: 2,
        backgroundColor: 'rgb(255, 169, 63)',
        width: 12,
        height: 12,
        borderRadius: 6
    }
})

class NotificationsIcon extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Notifications');
            }}>
                {
                    this.props.userInformation && this.props.userInformation.hasPendingNotification ? (
                        <View>
                            <Icon name={'bell'} type={'font-awesome'} color={'white'}/>
                            <View style={bellStyle.pendingView}></View>
                        </View>
                    ) : (
                        <Icon name={'bell'} type={'font-awesome'} color={'white'}/>
                    )
                }
            </TouchableOpacity>
        )
    }
}

function mapStateToProps(state) {
    return {
        userInformation: state.userInformation
    }
}

export default connect(mapStateToProps)(NotificationsIcon);
