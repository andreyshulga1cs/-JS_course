import Page from "./Page.js";
import UsersList from "../UsersList.js";

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
        UsersList.render('.account-wrap');
    }
}