import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import UserService from '../components/services/UserService';
import NotificationsService from '../components/services/NotificationsService';

/*
* To keep things simple, as redux is way of a overbloat to this example,
* I'm keeping the stores, reducers and actions all in one file
*/

function loadUserInformation() {
    return (dispatch, id) => {
        UserService.me().then((userInformation) => {
            dispatch(setUserInformation(userInformation))
        })
    }
}

const setUserInformation = (userInformation) => {
    return {'type': 'SET_USER_INFORMATION', userInformation}
}

function loadNotifications() {
    return (dispatch, id) => {
        NotificationsService.query().then((notificationList) => {
            dispatch(setNotificationList(notificationList))
        })
    }
}

function seenNotification(notificationId) {
    return (dispatch, id) => {
        NotificationsService.get(notificationId);

        NotificationsService.query().then((notificationList) => {
            dispatch(setNotificationList(notificationList))
        })

        UserService.me().then((userInformation) => {
            dispatch(setUserInformation(userInformation))
        })
    }
}

const setNotificationList = (notificationList) => {
    return {'type': 'SET_NOTIFICATION_LIST', notificationList}
}

function userInformationReducer (state = {}, action) {
    switch(action.type) {
        case 'SET_USER_INFORMATION':
            return {
                ...state,
                userInformation: action.userInformation
            }
        break;
        case 'SET_NOTIFICATION_LIST':
            return {
                ...state,
                notificationList: action.notificationList
            }
        break;
    }

    return state;
}

const store = createStore(userInformationReducer, applyMiddleware(thunk))

export {
    loadUserInformation, setUserInformation,
    loadNotifications, setNotificationList,
    seenNotification, store
}
