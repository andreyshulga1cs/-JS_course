import Popup from '../Popup.js';
// import Storage from "./Storage.js";
import Form from "./Form.js";
import UserStatus from "../UserStatus.js";
import StorageUsers from "../Storage/StorageUsers.js";

const popup = new Popup('.popup');
const popupFormLogin = new Popup('.popup-form.login');
const UsersStorage = new StorageUsers();

export default class FormLogin extends Form {
    constructor(selector) {
        super(selector);
    }
    submit() {
        super.submit()
        const user = this.user;

        if (this.isValid) {
            UsersStorage.get().then((users) => {
                if (users?.[user.email]?.password === user?.password) {
                    popup.open('You are logged in!');

                    UserStatus.login(user.email);
                    super.reset(); 
                } else {
                    popup.open('Email or Password are wrong!');
                }
            }).catch((error) => {
                popup.open(error);
            }).then(() => {
                popupFormLogin.close();
            });
        }

    }
}