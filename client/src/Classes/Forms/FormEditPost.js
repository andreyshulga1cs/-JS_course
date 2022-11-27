import Popup from "../Popup.js";
import DbPosts from "../db/DbPosts.js";
import Form from "./Form.js";
import PostsList from "../Posts/PostsList.js";

const PostsListInstance = new PostsList('.blog-wrap');

const popup = new Popup('.popup');
const popupFormEditPost = new Popup('.popup-form.edit-post');

export default class FormEditPost extends Form {
    constructor(selector) {
        super(selector);
        this.editablePost = {};
    }
    setEditablePost = (editablePostId) => {
        DbPosts.getPostById(editablePostId).then(res => {
            this.editablePost = res;
            console.log(res);
            if (res.thumbnail) {
                this.imagePath = res.thumbnail;
            } else {
                this.imagePath = 'http://localhost:3000/src/assets/img/no-image.jpg';
            }

            this.formFields.forEach(input => {
                switch (input.type) {
                    case 'radio':
                        if (res[input.name] === input.value) {
                            input.checked = true;
                        }
                    break;
                    case 'file':
                        this.imageDOM.src = this.imagePath;
                    break;
                    default:
                        input.value = res[input.name] ?? '';
                }
            });
        });
    }
    submit() {
        super.submit();
        const post = this.data;
        if (this.isValid) {
            
            DbPosts.updatePostById(this.editablePost.id, post).then(res => {
                popup.open('Post was edited!');
                popupFormEditPost.close();
                PostsListInstance.renderPostsList();
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}