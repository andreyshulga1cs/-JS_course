import Page from "./Page.js";
import PostsList from "../Posts/PostsList.js";
import DbPosts from "../db/DbPosts.js";
import FormComment from "../Forms/FormComment.js";
import decodedToken from "../Services/decodedToken.js";

export default class PageBlogSingle extends Page {
    constructor() {
        super();

        if (!PageBlogSingle._instance) {
            PageBlogSingle._instance = this;
        }
        return PageBlogSingle._instance;
    }
    render() {
        const postId = window.location.href.split('id=')[1];
        const renderForm = () => {
            if (decodedToken) {
                return `<form id="form-comment">
                    <div class="input-wrap">
                        <h4>Send a comment:</h4>
                        <textarea name="content" id="" cols="30" rows="10"></textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>`;
            }
        }

        DbPosts.getPostById(postId).then(res => {
            const post = res;

            let commentsHtml = '<div class="comments-list">';
            res.comments.forEach(comment => {
                commentsHtml += 
                `<div class="comments-list__item">
                    <div class="author">${comment.userEmail}</div>
                    <div class="comment">${comment.content}</div>
                </div>`;
            });
            commentsHtml += '</div>';

            this.wrap.innerHTML = `
            <section class="blog-single">
                <div class="container">
                    <div class="thumbnail">
                        <img src="${post.thumbnail}" alt="">
                        <h1 class="title">${post.title}</h1>
                        <div class="author">Author: ${post?.user.email}</div>
                    </div>
                    <div class="content">${post.description}</div>
                    <div class="comments">
                        <h3>Comments</h3>
                        ${commentsHtml}
                    </div>
                    
                    ${renderForm()}
                </div>
            </section>
            `;
            new FormComment('#form-comment', postId);
        }).catch(er => {
            console.log(er);
        });

        const PostsListInstance = new PostsList('.blog-wrap');
        PostsListInstance.renderPostsList();
    }
}