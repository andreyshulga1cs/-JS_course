import Popup from "../Popup.js";
import DbUsers from "../db/DbUsers.js";
import DbPosts from "../db/DbPosts.js";
import decodedToken from "../Services/decodedToken.js";

import Form from "./Form.js";

const popup = new Popup('.popup');

export default class FormCreatePost extends Form {
    constructor(selector) {
        super(selector);
    }
    submit() {
        super.submit();
        const post = this.data;
        if (this.isValid) {
            
            DbUsers.getUserByEmail(decodedToken.email).then(user => {
                post.user = user.id;
                DbPosts.createPost(post).then(res => {
                    popup.open('Post was added!');
                }).catch((err) => {
                    console.log(err);
                });
            });
        }
    }
}