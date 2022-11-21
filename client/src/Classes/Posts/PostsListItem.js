export default class PostsListItem {
    constructor(post) {
        this.post = post;
    }
    render() {
        const photoUrl = this.post.thumbnail || 'http://localhost:3000/src/assets/img/no-image.jpg';
        
        return `
        <a href="http://localhost:3000/#/blog/single?id=${this.post.id}" class="blog-list__item">
            <div class="author">${this.post.user.email}</div>
            <div class="thumbnail">
                <img src="${photoUrl}" alt="">
            </div>
            <h4 class="title">${this.post.title}</h4>
            <div class="desc">${this.post.description}</div>
            <div class="comments-list">
                <div class="comments-list__item">
                    <div class="author"></div>
                    <div class="content"></div>
                </div>
            </div>
        </a>
        `;
    }
}