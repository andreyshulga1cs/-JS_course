import PostsListItem from "./PostsListItem.js";
import DbPosts from "../db/DbPosts.js";
import DbUsers from "../db/DbUsers.js";
import decodedToken from "../Services/decodedToken.js";

export default class PostsList {
    constructor(selector) {
        this.selector = selector;
    }
    renderPostsList() {
        let el = document.querySelector(this.selector);
        if (el) {
            let html = '<div class="preloader">Загрузка</div>';
                
            DbPosts.getPosts().then(res => {
                html = '<div class="blog-list">';
                    res.sort((a, b) => a.id - b.id);

                    res.forEach(post => {
                        html += new PostsListItem(post).render();
                    });
                html += '</div>';
            }).catch(error => {
                html = error;
            }).then(() => {
                el.innerHTML = html;
            });
        }
    }
    renderLikedPosts() {
        let el = document.querySelector(this.selector);
        if (el) {
            let html = '<div class="preloader">Загрузка</div>';
                
            DbUsers.getUserByEmail(decodedToken.email).then(res => {
                html = '<div class="blog-list preview">';
                    if (res.likes) {
                        res.likes.sort((a, b) => a.id - b.id);
                        res.likes.forEach(post => {
                            html += new PostsListItem(post).renderPreview();
                        });
                    }
                html += '</div>';
            }).catch(error => {
                html = error;
            }).then(() => {
                el.innerHTML = html;
            });
        }
    }
    renderCreatedPosts() {
        let el = document.querySelector(this.selector);
        if (el) {
            let html = '<div class="preloader">Загрузка</div>';
                
            DbUsers.getUserByEmail(decodedToken.email).then(res => {
                console.log(res);
                html = '<div class="blog-list preview">';
                    res.posts.sort((a, b) => a.id - b.id);
                    res.posts.forEach(post => {
                        html += new PostsListItem(post).renderPreview();
                    });
                html += '</div>';
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