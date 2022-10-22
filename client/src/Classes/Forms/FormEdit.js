import Popup from '../Popup.js';
import StorageUsers from "../Storage/StorageUsers.js";
import Form from "./Form.js";
import UsersList from "../UsersList.js";

const popup = new Popup('.popup');
const popupFormEdit = new Popup('.popup-form.edit');
const UsersStorage = new StorageUsers();

export default class FormEdit extends Form {
    constructor(selector) {
        super(selector);
        this.editableUser = {};
    }
    setEditableUser(editableUserEmail) {
        this.editableUser.email = editableUserEmail;
        UsersStorage.get().then(users => {
            this.editableUser.details = users[editableUserEmail];
            this.inputs.forEach(input => {
                if (input.type === 'radio') {
                    if (this.editableUser.details[input.name] === input.value) {
                        input.checked = true;
                    }
                } else {
                    input.value = this.editableUser.details[input.name] ?? '';
                }
            });
        });
    }
    submit() {
        super.submit()
        const user = this.user;

        if (this.isValid) {
            UsersStorage.edit(this.editableUser.email, this.user).then(() => {
                popup.open(`User ${user.email} has been edited!`);
                super.reset();
                UsersList.render('.account-wrap');
            }).catch((error) => {
                popup.open(error)
            }).then(() => {
                popupFormEdit.close();
            });
        }
    }
}