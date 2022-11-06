import db from '../db.js';

const usersTable = 'public.user';

class UserController {
    async createUser(req, res) {
        const {email, age, password, sex, tel, avatar} = req.body;
        const newUser = await db.query(`INSERT INTO ${usersTable} (email, age, password, sex, tel, avatar) values ($1, $2, $3, $4, $5, $6) RETURNING *`, [email, age, password, sex, tel, avatar])
        res.json(newUser.rows[0])
    }
    async getUsers(req, res) {
        const users = await db.query(`SELECT * FROM ${usersTable}`);
        res.json(users.rows);
    }
    async getUserByEmail(req, res) {
        const email = req.params.email;
        const users = await db.query(`SELECT * FROM ${usersTable} where email = $1`, [email]);
        res.json(users.rows[0]);
    }
    async updateUserByEmail(req, res) {
        const email = req.params.email;
        const {age, password, sex, tel, avatar} = req.body;
        await db.query(
            `UPDATE ${usersTable} SET age = COALESCE($2, age), password = COALESCE($3, password), sex = COALESCE($4, sex), tel = COALESCE($5, tel), avatar = COALESCE($6, avatar) WHERE email = $1 RETURNING *`, 
            [email, age, password, sex, tel, avatar])
        .then(res => res.json(res.rows[0]))
        .catch(e => res.json(e.stack))
    }
    async deleteUserByEmail(req, res) {
        const email = req.params.email;
        await db.query(`DELETE FROM ${usersTable} WHERE email = $1`, [email])
        .then(res => res.json(res.rows[0]))
        .catch(e => res.json(e.stack))
    }
    // async getUser(req, res) {
    //     const id = req.params.id;
    //     const users = await db.query(`SELECT * FROM ${usersTable} where id = $1`, [id]);
    //     res.json(users.rows[0]);
    // }
    // async updateUser(req, res) {
    //     const id = req.params.id;
    //     const {email, age, password, sex, tel} = req.body;
    //     const user = await db.query(
    //         `UPDATE ${usersTable} set email = $1, age = $2, password = $3, sex = $4, tel = $5 WHERE id = ${id}`,
    //         [email, age, password, sex, tel]
    //     )
    //     res.json(user.rows[0])
    // }
    // async deleteUser(req, res) {
    //     const id = req.params.id;
    //     // const users = await db.query(`DELETE * FROM ${usersTable} where id = $1`, [id]);
    //     // const users = await db.query(`DELETE FROM ${usersTable}`);
    //     // res.json(users.rows[0]);
    // }
}

export default new UserController;