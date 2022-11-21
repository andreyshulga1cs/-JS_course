import Page from "./Page.js";
import PostsList from "../Posts/PostsList.js";
import FormCreatePost from "../Forms/FormCreatePost.js";

export default class PageBlog extends Page {
    constructor() {
        super();
    }
    render() {
        this.wrap.innerHTML = `
        <section class="blog">
            <div class="container">
                <h1>Blog</h1>
                <form id="form-create-post">
                    <h3>Create post</h3>
                    <div class="input-wrap">
                        <h4>Title:</h4>
                        <input type="text" name="title">
                    </div>
                    <div class="input-wrap">
                        <h4>Description:</h4>
                        <textarea name="description" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div class="input-wrap">
                        <h4>Thumbnail:</h4>
                        <div class="image">
                            <img src="/src/assets/img/no-image.jpg" alt="">
                        </div>
                        <input type="file" name="image">
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <div class="blog-wrap">
                </div>
            </div>
        </section>
        `;

        new FormCreatePost('#form-create-post');
        const PostsListInstance = new PostsList('.blog-wrap');
        PostsListInstance.renderPostsList();
    }
}