import './router.js';

import decodedToken from "./Classes/Services/decodedToken.js";

import DbUsers from "./Classes/db/DbUsers.js";
import DbPosts from "./Classes/db/DbPosts.js";

import Popup from "./Classes/Popup.js";
import UserStatus from "./Classes/Users/UserStatus.js";

import FormRegister from "./Classes/Forms/FormRegister.js";
import FormLogin from "./Classes/Forms/FormLogin.js";
import FormEdit from "./Classes/Forms/FormEdit.js";
import FormCreatePost from "./Classes/Forms/FormCreatePost.js";
import FormEditPost from "./Classes/Forms/FormEditPost.js";

import UsersList from "./Classes/Users/UsersList.js";
const UsersListInstance = new UsersList('.account-wrap');

import PostsList from "./Classes/Posts/PostsList.js";
const PostsListInstance = new PostsList('.blog-wrap');

import Storage from "./Classes/Storage/Storage.js";

new FormRegister('#form-register');
new FormLogin('#form-login');
const FormEditInstance = new FormEdit('#form-edit');
new FormCreatePost('#form-create-post');
const FormEditPostInstance = new FormEditPost('#form-edit-post');


const defaultPopup = new Popup('.popup');
const popupFormRegister = new Popup('.popup-form.register');
const popupFormLogin = new Popup('.popup-form.login');
const popupFormEdit = new Popup('.popup-form.edit');
const popupCreatePost = new Popup('.popup-form.create-post');
const popupEditPost = new Popup('.popup-form.edit-post');

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

    } else if (classes.includes('create-post-button')) {
        popupCreatePost.open();

    } else if (classes.includes('edit-post')) {
        const postItemWrap = e.target.offsetParent,
              postId = postItemWrap.dataset.postId;

        FormEditPostInstance.setEditablePost(postId);
        popupEditPost.open();

    } else if (classes.includes('remove-post')) {
        const isRemove = confirm("Are you sure?");

        if (isRemove) {
            const postItemWrap = e.target.offsetParent,
                  postId = postItemWrap.dataset.postId;

            DbPosts.deletePostById(postId).then(() => {
                defaultPopup.open(`The post has been deleted`);
                postItemWrap.remove();
                PostsListInstance.renderPostsList();
                
            }).catch(error => {
                defaultPopup.open(error);
            })

        }
    } else if (classes.includes('like')) {
        const countTag = e.target.querySelector('.count'),
            countNumber = parseInt(countTag.innerHTML);

        const postItemWrap = e.target.offsetParent,
                postId = postItemWrap.dataset.postId;

        DbPosts.toggleLike(postId, decodedToken.email).then((res) => {

            console.log(res);
        }).catch(error => {
            defaultPopup.open(error);
        });

        e.target.classList.toggle("active");
        if (e.target.classList.value.includes('active')) {
            countTag.innerHTML = countNumber + 1;
        } else {
            countTag.innerHTML = countNumber - 1;
        }
    } else if (e.target.dataset.tabBtn) {
        const tabId = e.target.dataset.tabBtn;
        
        document.querySelectorAll(`[data-tab]`).forEach(el => {
            el.style.display = 'none';
        });
        document.querySelector(`[data-tab="${tabId}"]`).style.display = 'block';
    }
});

// document.querySelector('.like').addEventListener('click', e => {
//     console.log(2);
//     console.log(this);
//     console.log(e);
// });

UserStatus.setInitialHeaderButtons();
// DbUsers.getUsers().then(res => {
//     console.log(res);
// }).catch(error => {
//     console.log(error);
// });