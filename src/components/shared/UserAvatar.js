import React, {Component} from 'react';
import { connect } from 'react-redux';

import { View, ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-elements';

import ImagePicker from 'react-native-image-picker';

import UserService from '../services/UserService';

import { setUserInformation } from '../../redux';

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

/*
* In this component I'm introducing side-effects, but for the same of
* keeping it simple, I will do the avatar upload, and rest query here
*/

class UserAvatar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }
    }

    showMediaPicker = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                alert('User cancelled image picker');
            } else if (response.error) {
                alert('ImagePicker Error: ', response.error);
            } else {
                this.setState({
                    isLoading: true
                }, () => {
                    UserService.uploadPicture(response.uri).then((userInformation) => {
                        this.setState({
                            isLoading: false
                        }, () => {
                            this.props.dispatch(setUserInformation(userInformation));
                        })
                    }).catch((error) => {
                        alert(error);
                    })
                })
            }
        });
    }

    render() {
        return (
            this.state.isLoading ? (
                <ActivityIndicator />
            ) : (
                this.props.userInformation && this.props.userInformation.picture ? (
                    <Avatar onPress={this.showMediaPicker} rounded source={{ uri: this.props.userInformation.picture }}/>
                ) : (
                    <Avatar onPress={this.showMediaPicker} rounded icon={{ name: 'home' }}/>
                )
            )
        )
    }
}

function mapStateToProps(state) {
    return {
        userInformation: state.userInformation
    }
}

export default connect(mapStateToProps)(UserAvatar);
