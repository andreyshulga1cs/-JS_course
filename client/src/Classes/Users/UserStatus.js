import Storage from "../Storage/Storage.js";

const sotrageToken = new Storage('token');

class UserStatus {
    constructor() {
        this.buttonsWrap = document.querySelector('header .user-buttons');
    }

    setInitialHeaderButtons() {
        let html;
        const token = sotrageToken.get();
        if (token) {
            html = `<a class="button2" href="#/account">${token[0]}</a><div class="button logout-button">Logout</div>`;
        } else {
            html = `<div class="button login-button">Login</div><div class="button register-button">Register</div>`;
        }
        this.buttonsWrap.innerHTML = html;
    }
    login(token) {
        sotrageToken.set(token);
        this.buttonsWrap.innerHTML = `<a class="button2" href="#/account">${token[0]}</a><div class="button logout-button">Logout</div>`;
    }
    logout() {
        sotrageToken.set(null);
        this.buttonsWrap.innerHTML = `<div class="button login-button">Login</div><div class="button register-button">Register</div>`;
    }
} 

const UserStatusInstance = new UserStatus();
export default UserStatusInstance;