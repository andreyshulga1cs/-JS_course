import Page from "./Page.js";
import UsersList from "../Users/UsersList.js";

import Storage from "../Storage/Storage.js";
const loginUser = new Storage('loginUser');

export default class PageAccount extends Page {
    constructor() {
        super();

        if (!PageAccount._instance) {
            PageAccount._instance = this;
        }
        return PageAccount._instance;
    }
    render() {
        this.wrap.innerHTML = `
        <section>
            <div class="container">
                <div class="account-wrap"></div>
            </div>
        </section>
        `;

        const UsersListInstance = new UsersList('.account-wrap');
        if (loginUser.get()) {
            UsersListInstance.renderUserList();
        } else {
            UsersListInstance.renderError();
        }
    }
}