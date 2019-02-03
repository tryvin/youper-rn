import { SERVER_URL } from './consts';

export default class NotificationsService {
    static query() {
        return fetch(`${SERVER_URL}/user/notifications`).then(response => response.json());
    }

    static get(notificationId) {
        return fetch(`${SERVER_URL}/user/notifications/${notificationId}`).then(response => response.json());
    }
}
