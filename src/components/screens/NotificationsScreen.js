import React, {Component} from 'react';
import { connect } from 'react-redux';

import {View, Text, FlatList} from 'react-native';
import { ListItem } from 'react-native-elements';

import mainStyle from '../baseStyle';


import { loadNotifications } from '../../redux';

class NotificationsScreen extends Component {
    _keyExtractor = (item, index) => `notification-${item.id}`;

    componentDidMount() {
        this.props.dispatch(loadNotifications());
    }

    showNotification = (item) => {
        this.props.navigation.navigate('ViewNotification', {
            item
        })
    }

    render() {
        return (
            <View style={mainStyle.mainView}>
                <FlatList
                    data={this.props.notificationList}
                    keyExtractor={this._keyExtractor}
                    refreshing={! this.props.notificationList}
                    renderItem={({item}) => {
                        return (
                            <View>
                                <ListItem
                                    containerStyle={mainStyle.notificationItem}
                                    title={item.title}
                                    subtitle={
                                        <View>
                                            <Text style={mainStyle.excerpt}>{item.excerpt}</Text>
                                            <Text style={mainStyle.date}>{item.date}</Text>
                                        </View>
                                    }
                                    chevron
                                    onPress={() => this.showNotification(item)}
                                />
                                {! item.isRead ? (
                                    <View style={mainStyle.pendingView}></View>
                                ) : null}
                            </View>
                        )
                    }}
                />
            </View>
        )
    }
}

mapStateToProps = (state) => {
    return {
        notificationList: state.notificationList
    }
}

export default connect(mapStateToProps)(NotificationsScreen);
