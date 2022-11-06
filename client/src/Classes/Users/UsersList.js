import UsersListItem from "./UsersListItem.js";
import DbUsers from "../db/DbUsers.js";

export default class UsersList {
    constructor(selector) {
        this.selector = selector;
    }
    renderUserList() {
        let el = document.querySelector(this.selector);
        if (el) {
            let html = '<div class="preloader">Загрузка</div>';
                
            DbUsers.getUsers().then(res => {
                html = '';
                res.sort((a, b) => a.id - b.id);

                res.forEach(user => {
                    html += new UsersListItem(user).render();
                });
            }).catch(error => {
                html = error;
            }).then(() => {
                el.innerHTML = html;
            });
        }
    }
    renderError() {
        let el = document.querySelector(this.selector);
        if (el) {
            el.innerHTML = 'You cant look throgh the page!';
        }
    }
}