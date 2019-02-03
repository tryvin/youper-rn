import {StyleSheet} from 'react-native';

const mainStyle = StyleSheet.create({
    mainView: {
        backgroundColor: 'rgb(104, 104, 104)',
        width: '100%',
        height: '100%',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    date: {
        fontSize: 12,
        marginTop: 10
    },
    excerpt: {
        fontSize: 14
    },
    notificationItem: {
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 20
    },
    pendingView: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'rgb(255, 169, 63)',
        width: 22,
        height: 22,
        borderRadius: 11
    },
    notificationMainView: {
        alignItems: 'center',
        width: '100%'
    },
    notificationView: {
        backgroundColor: 'white',
        width: '95%',
        borderRadius: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20
    }
});

export default mainStyle;
