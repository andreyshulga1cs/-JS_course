import Storage from "../Storage/Storage.js";

const loginUser = new Storage('loginUser');

class UserStatus {
    constructor() {
        this.buttonsWrap = document.querySelector('header .user-buttons');
    }

    setInitialHeaderButtons() {
        let html;
        if (loginUser.get()) {
            html = `<a class="button2" href="#/account">${loginUser.get()}</a><div class="button logout-button">Logout</div>`;
        } else {
            html = `<div class="button login-button">Login</div><div class="button register-button">Register</div>`;
        }
        this.buttonsWrap.innerHTML = html;
    }
    login(userEmail) {
        loginUser.set(userEmail);
        this.buttonsWrap.innerHTML = `<a class="button2" href="#/account">${userEmail}</a><div class="button logout-button">Logout</div>`;
    }
    logout() {
        loginUser.set(null);
        this.buttonsWrap.innerHTML = `<div class="button login-button">Login</div><div class="button register-button">Register</div>`;
    }
} 

const UserStatusInstance = new UserStatus();
export default UserStatusInstance;