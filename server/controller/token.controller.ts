const jwt = require('jsonwebtoken');

// интерсептор
// из локал стораджа в хедер bearer и сравниваем с базой
// access
// get extention from file name

// отправить пост в админке юзера
// и отображать потом посты

// при логине редирект на страницу постов

class TokenController {
    generateAccessToken(payload: any) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn:'30m'});
        return accessToken;
    }

    // async saveToken(userId: any, refreshToken: any) {
    //     const tokenData = await tokenRepository.findOneBy({
    //         user: userId,
    //     });
    //     if (tokenData) {
    //         tokenData.refreshToken = refreshToken;
    //         return tokenData;
    //     } else {
    //         const token = new TokenDb();
    //         token.user = userId || '';
    //         token.refreshToken = refreshToken || '';

    //         const createToken = await tokenRepository.save(token)
    //         return token;
    //     }
    // }
}
const token = new TokenController();
export default token;