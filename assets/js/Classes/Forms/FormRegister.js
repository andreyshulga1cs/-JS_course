import Popup from "../Popup.js";
// import Storage from "./Storage.js";
// const UsersStorage = new Storage('users');
import StorageUsers from "../Storage/StorageUsers.js";
import Form from "./Form.js";

const popup = new Popup('.popup');
const popupFormRegister = new Popup('.popup-form.register');
const UsersStorage = new StorageUsers();

export default class FormRegister extends Form {
    constructor(selector) {
        super(selector);
    }
    submit() {
        super.submit();
        const user = this.user;

        if (this.isValid) {
            if (user.password !== user.password2 && user.password2 !== null) {
                popup.open('Passwords are different!');
            } else {
                UsersStorage.set(user).then(() => {
                    popup.open(`User ${user.email} was added!`);
                    super.reset();
                }).catch((error) => {
                    popup.open(error)
                }).then(() => {
                    popupFormRegister.close();
                });
            }
        }
    }
}