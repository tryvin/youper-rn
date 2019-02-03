const express = require('express')
var cors = require('cors')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

const app = express()
app.use(cors())
app.use('/uploads', express.static('uploads'))

const port = 3000

var notificationList = [
    {
        'id': 1,
        'title': 'New Feature!',
        'excerpt': 'Now you can customize your avatar uploading your selfie...',
        'body': 'Now you can customize your avatar uploading your selfie. <br/>Just click on the avatar, take, or select a picture and save.',
        'image': 'https://picsum.photos/g/200/130/?random',
        'date': '5 minutes ago',
        'isRead': false
    },
    {
        'id': 2,
        'title': 'Yet another feature!',
        'excerpt': 'Enjoy the code',
        'body': 'Now you can enjoy the code',
        'image': 'https://picsum.photos/g/200/130/?random',
        'date': '10 minutes ago',
        'isRead': true
    },
    {
        'id': 3,
        'title': 'Yet another feature, and another!',
        'excerpt': 'Enjoy the code you are seeying',
        'body': 'Now you can enjoy the code this blah blah blah blah blah',
        'image': 'https://picsum.photos/g/200/130/?random',
        'date': '20 minutes ago',
        'isRead': false
    }
];

var userInformation = {
    'id': 1,
    'name': 'Its me',
    'picture': false,
    'hasPendingNotification': true
};

app.get('/', (req, res) => {
    res.json({'error': false})
})

app.get('/user/notifications', (req, res) => {
    res.json(notificationList);
})

app.get('/user/notifications/:id', (req, res) => {
    //First we mark it as read, and cache the item
    let foundElement = false;

    notificationList = notificationList.map((item) => {
        if ( item.id == req.params.id ) {
            foundElement = {
                ...item,
                isRead: true
            };

            return foundElement;
        }

        return item;
    });

    //Check if we still have any pending notification and update the user information
    userInformation.hasPendingNotification = notificationList.reduce((acumullator, item) => {
        if ( ! item.isRead ) {
            return true;
        }

        return acumullator;
    }, false);

    res.json(foundElement);
})

app.get('/user/me', (req, res) => {
    res.json(userInformation);
})

app.post('/user/upload-picture', upload.single('file'), (req, res, next) => {
    if ( req.file ) {
        userInformation.picture = `http://${req.hostname}:${port}/${req.file.path}`;
    }

    res.json(userInformation);
})

app.listen(port, () => console.log(`Youper Server listing on port ${port}!`))
