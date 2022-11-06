import UsersListItem from "./UsersListItem.js";
import StorageUsers from "./Storage/StorageUsers.js";
import Storage from "./Storage/Storage.js";

const UsersStorage = new StorageUsers();
const loginUser = new Storage('loginUser');

class UsersList {
    constructor() {
        if (!UsersList._instance) {
            UsersList._instance = this;
        }
        return UsersList._instance;
    }
    render(selector) {
        const el = document.querySelector(selector);
        if (el) {
            let html = '<div class="preloader">Загрузка</div>';
            if (loginUser.get()) {
                UsersStorage.get().then((users) => {
                    html = '';
                    for (let user in users) {
                        
                        html += new UsersListItem({[user]: users[user]}).render();
                    }
                }).catch((error) => {
                    html = error;
                }).finally(() => {
                    el.innerHTML = html;
                })
            } else {
                html = 'You cant look throgh the page!';
            }
            el.innerHTML = html;
        }
        console.log(2);
    }
}

const UsersListInstance = new UsersList();
export default  UsersListInstance;