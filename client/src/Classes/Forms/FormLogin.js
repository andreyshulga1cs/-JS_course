import Popup from '../Popup.js';
import Form from "./Form.js";
import UserStatus from "../UserStatus.js";
import DbUsers from "../db/DbUsers.js";

import UsersList from "../UsersList.js";
const UsersListInstance = new UsersList('.account-wrap');

const popup = new Popup('.popup');
const popupFormLogin = new Popup('.popup-form.login');

export default class FormLogin extends Form {
    constructor(selector) {
        super(selector);
    }
    submit() {
        super.submit()
        const user = this.user;

        if (this.isValid) {
            DbUsers.getUserByEmail(user.email).then(res => {
                console.log(res);
                if (res.password === user.password) {
                    popup.open('You are logged in!');

                    UserStatus.login(user.email);
                    UsersListInstance.renderUserList();
                    super.reset(); 
                } else {
                    popup.open('Email or Password are wrong!');
                }
            }).catch(error => {
                popup.open(error)
            }).then(() => {
                popupFormLogin.close();
            });
        }

    }
}