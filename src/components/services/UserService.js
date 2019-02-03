import { SERVER_URL } from './consts';

export default class UserService {
    static me() {
        return fetch(`${SERVER_URL}/user/me`).then(response => response.json());
    }

    static uploadPicture(pictureUrl) {
        const data = new FormData();

        data.append('file', {uri: pictureUrl, name: 'image.jpg', type: 'multipart/form-data'});

        return fetch(`${SERVER_URL}/user/upload-picture`, {
            method: 'post',
            body: data
        }).then(response => response.json());
    }
}
