import Page from "./Page.js";
import PostsList from "../Posts/PostsList.js";

export default class PageBlog extends Page {
    constructor() {
        super();

        if (!PageBlog._instance) {
            PageBlog._instance = this;
        }
        return PageBlog._instance;
    }
    render() {
        this.wrap.innerHTML = `
        <section class="blog">
            <div class="container">
                <h1>Blog</h1>
                <div class="btn create-post-button">Create post</div>
                <div class="blog-wrap">
                </div>
            </div>
        </section>
        `;

        const PostsListInstance = new PostsList('.blog-wrap');
        PostsListInstance.renderPostsList();
    }
}