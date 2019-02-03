import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';

import MainScreen from './src/components/screens/MainScreen';
import NotificationsScreen from './src/components/screens/NotificationsScreen';
import ViewNotificationScreen from './src/components/screens/ViewNotificationScreen';

import { store } from './src/redux';

const AppNavigator = createStackNavigator({
    Main: {
        screen: MainScreen
    },
    Notifications: {
        screen: NotificationsScreen
    },
    ViewNotification: {
        screen: ViewNotificationScreen
    }
}, {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: 'rgb(104, 104, 104)',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        )
    }
}
