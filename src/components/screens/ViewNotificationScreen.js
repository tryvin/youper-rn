import React, {Component} from 'react';
import { connect } from 'react-redux';

import {View, FlatList } from 'react-native';
import { ListItem, Text, Button, Image } from 'react-native-elements';

import mainStyle from '../baseStyle';


import { seenNotification } from '../../redux';

class ViewNotificationScreen extends Component {
    constructor(props) {
        super(props);

        let item = this.props.navigation.getParam('item', {});

        this.state = {
            item: item
        }

        if ( item.id ) {
            props.dispatch(seenNotification(item.id));
        }
    }

    componentDidUpdate(prevProps) {
        let item = this.props.navigation.getParam('item', {});

        if ( item !== this.state.item ) {
            this.setState({
                item
            }, () => {
                if ( item.id ) {
                    this.props.dispatch(seenNotification(item.id));
                }
            })
        }
    }

    render() {
        return (
            <View style={[mainStyle.mainView, mainStyle.notificationMainView]}>
                {this.state.item && this.state.item.id ? (
                    <View style={mainStyle.notificationView}>
                        <Text h3>{this.state.item.title}</Text>
                        <Text>{this.state.item.body}</Text>
                        {this.state.item.image ? (
                            <Image source={{uri: this.state.item.image}} style={{ width: 200, height: 130 }} />
                        ) : null}

                        <Button title={"Got it!"} onPress={() => { this.props.navigation.goBack() }} />
                    </View>
                ) : null}
            </View>
        )
    }
}

export default connect()(ViewNotificationScreen);
