import decodedToken from "../Services/decodedToken.js";
import Storage from "../Storage/Storage.js";

const storageToken = new Storage('token');

class UserStatus {
    constructor() {
        this.buttonsWrap = document.querySelector('header .user-buttons');
    }

    setInitialHeaderButtons() {
        let html;
        if (decodedToken) {
            html = `<a class="button2" href="#/account">${decodedToken.email}</a><div class="button logout-button">Logout</div>`;
        } else {
            html = `<div class="button login-button">Login</div><div class="button register-button">Register</div>`;
        }
        this.buttonsWrap.innerHTML = html;
    }
    login(token) {
        storageToken.set(token);
        this.buttonsWrap.innerHTML = `<a class="button2" href="#/account">${decodedToken.email}</a><div class="button logout-button">Logout</div>`;
    }
    logout() {
        storageToken.set(null);
        this.buttonsWrap.innerHTML = `<div class="button login-button">Login</div><div class="button register-button">Register</div>`;
    }
} 

const UserStatusInstance = new UserStatus();
export default UserStatusInstance;