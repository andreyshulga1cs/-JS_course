import Popup from '../Popup.js';
import DbUsers from "../db/DbUsers.js";
import Form from "./Form.js";
import UsersList from "../Users/UsersList.js";
const UsersListInstance = new UsersList('.account-wrap');

const popup = new Popup('.popup');
const popupFormEdit = new Popup('.popup-form.edit');

export default class FormEdit extends Form {
    constructor(selector) {
        super(selector);
        this.editableUser = {};
    }
    setEditableUser = (editableUserEmail) => {
        DbUsers.getUserByEmail(editableUserEmail).then(res => {
            this.editableUser = res;
            console.log(res);
            if (res.avatar) {
                this.imagePath = res.avatar;
            } else {
                this.imagePath = 'http://localhost:3000/src/assets/img/no-photo.jpg';
            }

            this.formFields.forEach(input => {
                switch (input.type) {
                    case 'radio':
                        if (res[input.name] === input.value) {
                            input.checked = true;
                        }
                    break;
                    case 'file':
                        this.imageDOM.src = this.imagePath;
                    break;
                    default:
                        input.value = res[input.name] ?? '';
                }
            });
        });
    }
    submit() {
        super.submit()
        const user = this.data;

        if (this.editableUser.avatar === user.image) {
            delete user.image
        }

        if (this.isValid) {
            DbUsers.updateUserByEmail(this.editableUser.email, user).then(() => {
                popup.open(`User ${this.editableUser.email} has been edited!`);
                super.reset();

                UsersListInstance.renderUserList();
            }).catch((error) => {
                popup.open(error)
            }).then(() => {
                popupFormEdit.close();
            });
        }
    }
}