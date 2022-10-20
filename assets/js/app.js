import './router.js';

import Popup from "./Classes/Popup.js";
import UserStatus from "./Classes/UserStatus.js";

import FormRegister from "./Classes/Forms/FormRegister.js";
import FormLogin from "./Classes/Forms/FormLogin.js";
import FormEdit from "./Classes/Forms/FormEdit.js";


import Storage from "./Classes/Storage/Storage.js";

new FormRegister('#form-register');
new FormLogin('#form-login');
const FormEditInstance = new FormEdit('#form-edit');

import StorageUsers from "./Classes/Storage/StorageUsers.js";

const UsersStorage = new StorageUsers();
// edit remove
// sotrage user класс наследник
// setList в formEdit
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

            UsersStorage.remove(userEmail).then(() => {
                const loginUser = new Storage('loginUser');

                defaultPopup.open(`${userEmail} has been deleted`);
                userItemWrap.remove();
                
                if (loginUser.get() === userEmail) {
                    UserStatus.logout()
                }
            }).catch(error => {
                defaultPopup.open(error);
            })
        }
    }
});

const routerLinks = document.querySelectorAll('[href]');

routerLinks.forEach( el => {
    el.addEventListener('click', (e) => {
        history.pushState(null, null, e.target.dataset.path);
    })
})

UserStatus.setInitialHeaderButtons();