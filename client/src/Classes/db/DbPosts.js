import {SERVER_API_URL} from '../../Services/constans.js';

class DbPosts {
    async createPost(data) {
        await axios.post(SERVER_API_URL + '/post', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res;
        }).catch(error => {
            return error;
        })
    }
    async getPosts() {
        return axios.get(SERVER_API_URL + '/post').then(res => {
            return res.data;
        }).catch(error => {
            return error;
        })
    }
    async getPostById(id) {
        return axios.get(SERVER_API_URL + '/post/id/' + id).then(res => {
            return res.data;
        }).catch(error => {
            return error;
        })
    }
    async updatePostById(id, data) {
        return axios.put(SERVER_API_URL + '/post/id/' + id, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res;
        }).catch(error => {
            return error;
        })
    }
    async deletePostById(id) {
        return axios.delete(SERVER_API_URL + '/post/id/' + id).then(res => {
            return res;
        }).catch(error => {
            return error;
        })
    }
}
const DbPostsInstance = new DbPosts();
export default DbPostsInstance;