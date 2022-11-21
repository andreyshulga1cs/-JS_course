import Popup from '../Popup.js';
import Form from "./Form.js";
import UserStatus from "../Users/UserStatus.js";
import DbUsers from "../db/DbUsers.js";

import UsersList from "../Users/UsersList.js";
const UsersListInstance = new UsersList('.account-wrap');

const popup = new Popup('.popup');
const popupFormLogin = new Popup('.popup-form.login');

export default class FormLogin extends Form {
    constructor(selector) {
        super(selector);
    }
    submit() {
        super.submit()
        const user = this.data;

        if (this.isValid) {

            DbUsers.loginUser({email: user.email, password: user.password}).then(res => {
                if (res.data) {
                    popup.open('You are logged in!');

                    UserStatus.login(res.data);
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