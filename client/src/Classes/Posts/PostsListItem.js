import DbPosts from "../db/DbPosts.js";
import decodedToken from "../Services/decodedToken.js";

export default class PostsListItem {
    constructor(post) {
        this.post = post;
    }
    render() {
        let buttons = '',
            likeActiveClass = '';
        const photoUrl = this.post.thumbnail || 'http://localhost:3000/src/assets/img/no-image.jpg';

        if (decodedToken.email == this.post.user.email) {
            buttons = 
            `<div class="button edit-post"></div>
            <div class="button remove-post"></div>`;
        }
        if (this.post.likes.some(user => user.email === decodedToken.email)) {
            likeActiveClass = 'active';
        }
        
        return `
        <div class="blog-list__item" data-post-id="${this.post.id}">
            ${buttons}
            <div class="author">${this.post.user.email}</div>
            <div class="like ${likeActiveClass}">
                <div class="count">${this.post.likes.length}</div>
                <svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enable-background="new 0 0 48 48">
                    <path fill="#fff" d="M34,9c-4.2,0-7.9,2.1-10,5.4C21.9,11.1,18.2,9,14,9C7.4,9,2,14.4,2,21c0,11.9,22,24,22,24s22-12,22-24 C46,14.4,40.6,9,34,9z"/>
                </svg>
            </div>
            <a href="http://localhost:3000/#/blog/single?id=${this.post.id}" class="thumbnail">
                <img src="${photoUrl}" alt="">
            </a>
            <a href="http://localhost:3000/#/blog/single?id=${this.post.id}">
                <h4 class="title">${this.post.title}</h4>
            </a>
            <div class="desc">${this.post.description}</div>
            <div class="comments-list">
                <div class="comments-list__item">
                    <div class="author"></div>
                    <div class="content"></div>
                </div>
            </div>
        </div>
        `;
    }

    renderPreview() {
        const photoUrl = this.post.thumbnail || 'http://localhost:3000/src/assets/img/no-image.jpg';
        return `
        <div class="blog-list__item" data-post-id="${this.post.id}">
            <a href="http://localhost:3000/#/blog/single?id=${this.post.id}" class="thumbnail">
                <img src="${photoUrl}" alt="">
            </a>
            <a href="http://localhost:3000/#/blog/single?id=${this.post.id}">
                <h4 class="title">${this.post.title}</h4>
            </a>
        </div>
        `;
    }
}