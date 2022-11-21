import PostsListItem from "./PostsListItem.js";
import DbPosts from "../db/DbPosts.js";

export default class PostsList {
    constructor(selector) {
        this.selector = selector;
    }
    // <div class="blog-list">
	// 		<div class="blog-list__item">
	// 			<div class="thumbnail">
	// 				<img src="" alt="">
	// 			</div>
	// 			<h4 class="title"></h4>
	// 			<div class="desc"></div>
	// 		</div>
	// 	</div>
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
    renderError() {
        let el = document.querySelector(this.selector);
        if (el) {
            el.innerHTML = 'You cant look throgh the page!';
        }
    }
}