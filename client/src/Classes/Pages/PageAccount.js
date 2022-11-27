import Page from "./Page.js";
import UsersList from "../Users/UsersList.js";
import PostsList from "../Posts/PostsList.js";

import Storage from "../Storage/Storage.js";
const storageToken = new Storage('token');

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
        <section class="account">
            <div class="container">
                <nav class="sidebar">
                    <ul>
                        <li data-tab-btn="1">
                            <span>Users</span>
                        </li>
                        <li data-tab-btn="2">
                            <span>Liked posts</span>
                        </li>
                        <li data-tab-btn="3">
                            <span>Created posts</span>
                        </li>
                    </ul>
                </nav>
                <div class="main-content">
                    <div data-tab="1">
                        <div class="account-wrap"></div>
                    </div>
                    <div data-tab="2">
                        <div class="liked-posts-wrap"></div>
                    </div>
                    <div data-tab="3">
                        <div class="created-posts-wrap"></div>
                    </div>
                </div>
            </div>
        </section>
        `;

        const UsersListInstance = new UsersList('.account-wrap');
        if (storageToken.get()) {
            UsersListInstance.renderUserList();
        } else {
            UsersListInstance.renderError();
        }

        const likedPostsListInstance = new PostsList('.liked-posts-wrap');
        likedPostsListInstance.renderLikedPosts();

        const createdPostsListInstance = new PostsList('.created-posts-wrap');
        createdPostsListInstance.renderCreatedPosts();
    }
}