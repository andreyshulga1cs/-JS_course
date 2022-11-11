import { User } from '../dbEntities/User';
import { AppDataSource } from "../data-source";

const userRepository = AppDataSource.getRepository(User);

class UserController {
    async createUser(req: any, res: any) {
        const {email, age, password, sex, tel, avatar} = req.body;

        const user = new User();

        user.email = email || '';
        user.age = age || '';
        user.password = password || '';
        user.sex = sex || '';
        user.tel = tel || '';
        user.avatar = avatar || '';

        await userRepository.save(user)
        .then((response: any) => res.json(response))
        .catch((e: any) => res.json(e))
    }
    async getUsers(req: any, res: any) {
        await userRepository.find()
        .then((response: any) => res.json(response))
        .catch((e: any) => res.json(e))
    }
    async getUserByEmail(req: any, res: any) {
        const email = req.params.email;

        await userRepository.findOneBy({
            email: email,
        })
        .then((response: any) => res.json(response))
        .catch((e: any) => res.json(e))
    }
    async updateUserByEmail(req: any, res: any) {
        const email = req.params.email;
        const {age, password, sex, tel, avatar} = req.body;

        const user = await userRepository.findOneBy({
            email: email,
        })
        user.age = age || '';
        user.password = password || '';
        user.sex = sex || '';
        user.tel = tel || '';
        user.avatar = avatar || '';

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