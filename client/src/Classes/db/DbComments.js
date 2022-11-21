import {SERVER_API_URL} from '../../Services/constans.js';

class DbComments {
    async createComment(data) {
        await axios.post(SERVER_API_URL + '/comment', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res;
        }).catch(error => {
            return error;
        })
    }
}
const DbCommentsInstance = new DbComments();
export default DbCommentsInstance;