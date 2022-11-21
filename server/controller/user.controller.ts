import User from '../dbEntities/User';
import { AppDataSource } from "../data-source";

const imageToBase64 = require('image-to-base64');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRepository = AppDataSource.getRepository(User);

async function prepareUser(user: any) {
    const userInfo = {
        id: user.id,
        email: user.email,
        age: user.age,
        password: user.password,
        sex: user.sex,
        tel: user.tel,
        avatar: user.avatar,
        accessToken: user.accessToken,
    };
  
    if (!userInfo.avatar) {
        return userInfo;
    }
  
    const base64 = await imageToBase64(user.avatar);
    const fileExtension = user.avatar.substring(user.avatar.lastIndexOf(".")+1);
    
    userInfo.avatar = `data:image/${fileExtension};base64,${base64}`;
    return userInfo;
}

class UserController {

    async loginUser(req: any, res: any) {
        const {email, password} = req.body;
        const user = await userRepository.findOneBy({
            email: email,
        });

        if (bcrypt.compareSync(password, user.password)) {
            res.json(user.accessToken);
        }
    }
    // async registration(req: any, res: any) {
    //     const {email, password} = req.body;
    //     const user = await userRepository.findOneBy({
    //         email: req.params.email,
    //     });
    // }

    async createUser(req: any, res: any) {
        const {email, age, password, sex, tel, image} = req.body;

        const user = new User();

        const hashPasword = await bcrypt.hash(password, 3);
        // process.env.SALT

        user.email = email || '';
        user.age = age || '';
        user.password = hashPasword || '';
        user.sex = sex || '';
        user.tel = tel || '';
        user.avatar = image || '';

        const accessToken = jwt.sign({email}, process.env.JWT_ACCESS_SECRET, {expiresIn:'30m'});
        user.accessToken = accessToken || '';
        // user.accessToken = tokens.accessToken || '';
        // user.refreshToken = tokens.refreshToken || '';

            // await TokenControllerInstance.saveToken(user.id, tokens.refreshToken);

            // res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})
            
        const newUser = await userRepository.save(user);
        res.json(newUser);
    }

    async getUsers(req: any, res: any) {
        const users = await userRepository.find();
      
        const usersResponse = await Promise.all(users.map((user) => prepareUser(user)));
      
        res.json(usersResponse);
    }

    async getUserByEmail(req: any, res: any) {
        const user = await userRepository.findOneBy({
            email: req.params.email,
        });

        if (user) {
            const userResponse = await prepareUser(user);
            res.json(userResponse);
        } else {
            res.json('');
        }
    }

    async updateUserByEmail(req: any, res: any) {
        const email = req.params.email;
        const {age, password, sex, tel, image} = req.body;

        const user = await userRepository.findOneBy({
            email: email,
        })
        user.age = age || '';
        user.password = password || '';
        user.sex = sex || '';
        user.tel = tel || '';
        if (user.avatar && !image) {
            user.avatar = user.avatar;
        } else {
            user.avatar = image || '';
        }

        await userRepository.save(user)
        res.json(user)
    }
    
    async deleteUserByEmail(req: any, res: any) {
        const email = req.params.email;
        const user = await userRepository.findOneBy({
            email: email,
        })
        await userRepository.remove(user)
        res.json('user was deleted')
    }
}

export default new UserController;