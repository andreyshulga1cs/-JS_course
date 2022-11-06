import Storage from './Storage.js';

export default class UserStorage extends Storage {
    constructor() {
        let keyStorage = 'users';
        super(keyStorage);
        this.keyStorage = keyStorage;

        if (!UserStorage._instance) {
            UserStorage._instance = this;
        }
        return UserStorage._instance;
    }
   
    time(seconds) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000))
    }

    async set(user) {
        await this.time(1);
        let users = JSON.parse(localStorage.getItem(this.keyStorage));
        (users === null) && (users = {});

        if (typeof users[user.email] !== 'undefined') {
            throw 'The email is already registered!';
        } else {
            users[user.email] = {};

            for (let key in user) {
                if (key != 'email' && key != 'password2') {
                    users[user.email][key] = user[key];
                }
            }
    
            localStorage.setItem(this.keyStorage, JSON.stringify(users));
        }
    
    }
    async get() {
        await this.time(1);
        return super.get();
    }
    async remove(userEmail) {
        await this.time(1);
        let users = JSON.parse(localStorage.getItem(this.keyStorage));

        if (typeof users[userEmail] === 'undefined') {
            throw 'The email hasn`t been found!';
        } else {
            delete users[userEmail];
    
            localStorage.setItem(this.keyStorage, JSON.stringify(users));
        }
    }
    async edit(userEmail, editableInfo) {
        await this.time(1);
        let users = JSON.parse(localStorage.getItem(this.keyStorage));
        
        for (let key in editableInfo) {
            if (key !== 'email') {

                users[userEmail][key] = editableInfo[key];

            }
        }
        localStorage.setItem(this.keyStorage, JSON.stringify(users));
    }
}