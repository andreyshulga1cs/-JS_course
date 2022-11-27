import Storage from "../Storage/Storage.js";
import "../../../node_modules/jwt-decode/build/jwt-decode.js";

const token = new Storage('token').get();
const decodedToken = token && jwt_decode(token);

export default decodedToken;

// edit и форма добавления поста модалкой

// добавить юзера к комеенту

// добавить лайки через связь 
// jsonb