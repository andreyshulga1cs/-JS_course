import Popup from "../Popup.js";
import DbUsers from "../db/DbUsers.js";

import Form from "./Form.js";

const popup = new Popup('.popup');
const popupFormRegister = new Popup('.popup-form.register');

export default class FormRegister extends Form {
    constructor(selector) {
        super(selector);
    }
    submit() {
        super.submit();
        const user = this.data;

        if (this.isValid) {
            if (user.password !== user.password2 && user.password2 !== null) {
                popup.open('Passwords are different!');
            } else {
                DbUsers.getUserByEmail(user.email).then((res) => {
                    if (res) {
                        popup.open('The email is already registered!');
                    } else {
                        DbUsers.createUser(user).then(() => {
                            popup.open(`User ${user.email} was added!`);
                            super.reset();
                        }).catch(err => {
                            console.log(err);
                        }).then(() => {
                            popupFormRegister.close();
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    }
}