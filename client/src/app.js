

import './router.js';

import DbUsers from "./Classes/db/DbUsers.js";

import Popup from "./Classes/Popup.js";
import UserStatus from "./Classes/Users/UserStatus.js";

import FormRegister from "./Classes/Forms/FormRegister.js";
import FormLogin from "./Classes/Forms/FormLogin.js";
import FormEdit from "./Classes/Forms/FormEdit.js";

import UsersList from "./Classes/Users/UsersList.js";
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

UserStatus.setInitialHeaderButtons();
DbUsers.getUsers().then(res => {
    console.log(1);
    console.log(res);
}).catch(error => {
    console.log(2);
    console.log(error);
});


// let url = 'http://localhost:5000/uploads/2022-11-10T16-41-19.257Z-105897632-1557241558937avatar-e1541360922907.jpg';

// const getBase64FromUrl = async (url) => {
//     const data = await fetch(url);
//     const blob = await data.blob();
//     return new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(blob); 
//         reader.onloadend = () => {
//             const base64data = reader.result;   
//             resolve(base64data);
//         }
//     });
// }
  
// getBase64FromUrl(url).then(console.log);

// toDataUrl(url, function(myBase64) {
//     console.log(myBase64); // myBase64 is the base64 string
// });
// console.log(toDataUrl(url));