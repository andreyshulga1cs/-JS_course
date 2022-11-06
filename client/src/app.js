

import './router.js';

import DbUsers from "./Classes/db/DbUsers.js";

import {SERVER_API_URL} from "./Services/constans.js";

import Popup from "./Classes/Popup.js";
import UserStatus from "./Classes/UserStatus.js";

import FormRegister from "./Classes/Forms/FormRegister.js";
import FormLogin from "./Classes/Forms/FormLogin.js";
import FormEdit from "./Classes/Forms/FormEdit.js";

import UsersList from "./Classes/UsersList.js";
const UsersListInstance = new UsersList('.account-wrap');

import Storage from "./Classes/Storage/Storage.js";

new FormRegister('#form-register');
new FormLogin('#form-login');
const FormEditInstance = new FormEdit('#form-edit');

const defaultPopup = new Popup('.popup');
const popupFormRegister = new Popup('.popup-form.register');
const popupFormLogin = new Popup('.popup-form.login');
const popupFormEdit = new Popup('.popup-form.edit');

document.addEventListener('click', e => {
    let classes = e.target.classList.value;

    if (classes.includes('login-button')) {
        popupFormLogin.open();
    } else if (classes.includes('register-button')) {
        popupFormRegister.open();
    } else if (classes.includes('logout-button')) {
        UserStatus.logout();
        UsersListInstance.renderError();
    } else if (classes.includes('edit-button')) {
        const userItemWrap = e.target.offsetParent,
              userEmail = userItemWrap.dataset.userEmail;

        FormEditInstance.setEditableUser(userEmail);
        popupFormEdit.open();

    } else if (classes.includes('remove-button')) {
        const isRemove = confirm("Are you sure?");

        if (isRemove) {
            const userItemWrap = e.target.offsetParent,
                  userEmail = userItemWrap.dataset.userEmail;


            DbUsers.deleteUserByEmail(userEmail).then(() => {
                const loginUser = new Storage('loginUser');

                defaultPopup.open(`${userEmail} has been deleted`);
                userItemWrap.remove();
                
                if (loginUser.get() === userEmail) {
                    UserStatus.logout();
                    UsersListInstance.renderError();
                }
            }).catch(error => {
                defaultPopup.open(error);
            })

        }
    }
});
DbUsers.getUsers().then(res => {
    console.log(res);
}).catch(error => {
    console.log(error);
});
UserStatus.setInitialHeaderButtons();


// const db = DbUsers;

// const fd = {
//     "email": "gegeg3@sdaf.com",
//     "tel": "3377596968",
//     "age": "13",
//     "password": "123453678d",
// };
// db.createUser(fd).then(res => {
//     console.log(res);
// }).catch(error => {
//     console.log(error);
// })

// db.getUsers().then(res => {
//     console.log(res);
// }).catch(error => {
//     console.log(error);
// })

// db.getUserByEmail("rddr234@gmail.com").then(res => {
//     console.log(res);
// }).catch(error => {
//     console.log(error);
// })

// let ggg = {age: 7, password: '2415mfdskf', sex: 'male', tel: '847192'};
// db.updateUserByEmail("rddr2@gmail.com", ggg).then(res => {
//     console.log(res);
// }).catch(error => {
//     console.log(error);
// })

// db.deleteUserByEmail("rddr23456@gmail.com").then(res => {
//     console.log(res);
// }).catch(error => {
//     console.log(error);
// })