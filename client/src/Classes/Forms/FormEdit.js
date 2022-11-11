import {SERVER_API_URL, SERVER_URL} from '../../Services/constans.js';

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
        this.avatarPath = '';
        this.avatarDOM = document.querySelector('.input-wrap .photo img');
        
        document.querySelector('.input-wrap [name="avatar"]').addEventListener('change', (e) => {
            const file = e.target.files[0];
            const data = new FormData();
            data.append('avatar', file);

            axios.post(SERVER_API_URL + '/upload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                this.avatarPath = SERVER_URL + '/uploads/' + res.data.filename;

                this.avatarDOM.src = this.avatarPath;
            }).catch(error => {
                console.log(error);
            })
        });
    }
    setEditableUser = (editableUserEmail) => {
        DbUsers.getUserByEmail(editableUserEmail).then(res => {
            this.editableUser = res;
            if (res.avatar) {
                this.avatarPath = res.avatar;
            } else {
                this.avatarPath = 'http://localhost:3000/src/assets/img/no-photo.jpg';
            }

            this.inputs.forEach(input => {
                switch (input.type) {
                    case 'radio':
                        if (res[input.name] === input.value) {
                            input.checked = true;
                        }
                    break;
                    case 'file':
                        this.avatarDOM.src = this.avatarPath;
                    break;
                    default:
                        input.value = res[input.name] ?? '';
                }
            });
        });
    }
    submit() {
        super.submit()
        const user = this.user;
        user.avatar = this.avatarPath;
        
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