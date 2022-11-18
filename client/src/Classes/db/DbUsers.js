import {SERVER_API_URL} from '../../Services/constans.js';

class DbUsers {
    async loginUser(data) {
        return await axios.post(SERVER_API_URL + '/login-user', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
    async createUser(data) {
        await axios.post(SERVER_API_URL + '/user', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res;
        }).catch(error => {
            return error;
        })
    }
    async getUsers() {
        return axios.get(SERVER_API_URL + '/user').then(res => {
            return res.data;
        }).catch(error => {
            return error;
        })
    }
    async getUserByEmail(email) {
        return axios.get(SERVER_API_URL + '/user/email/' + email).then(res => {
            return res.data;
        }).catch(error => {
            return error;
        })
    }
    async updateUserByEmail(email, data) {
        return axios.put(SERVER_API_URL + '/user/email/' + email, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res;
        }).catch(error => {
            return error;
        })
    }
    async deleteUserByEmail(email) {
        return axios.delete(SERVER_API_URL + '/user/email/' + email).then(res => {
            return res;
        }).catch(error => {
            return error;
        })
    }
}
const DbUsersInstance = new DbUsers();
export default DbUsersInstance;