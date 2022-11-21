import Popup from "../Popup.js";
import DbPost from "../db/DbPosts.js";
import DbUser from "../db/DbUsers.js";
import DbComment from "../db/DbComments.js";
import decodedToken from "../Services/decodedToken.js";

import Form from "./Form.js";

const popup = new Popup('.popup');

export default class FormComment extends Form {
    constructor(selector, postId) {
        super(selector);
        this.postId = postId;
    }
    async submit() {
        super.submit();
        const comment = this.data;
        comment.userEmail = decodedToken.email;
        comment.post = await DbPost.getPostById(this.postId);
        
        if (this.isValid) {
            await DbComment.createComment(comment).then(() => {
                popup.open('Comment was added!')
            });
        }
    }
}