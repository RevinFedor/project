import { sql } from "../db.js";
import bcrypt from "bcryptjs"
import { generateAccessToken } from "../utils/generateToken.js";

export const reg = async (req, res) => {
    const { name, email, password } = req.body

    const candidate = await sql`select * from Users where email = ${email}`

    if (candidate[0]) {
        res.status(400).send({
            message: "Пользователь уже существует"
        })
    } else {
        const hashPassword = bcrypt.hashSync(password, 7)
        const user = await sql`insert into Users (name, roleId, email, password) values (${name}, 1, ${email}, ${hashPassword})`
        const token = generateAccessToken(user.id, user.role)
        res.send({ message: "Пользователь успешно зарегистрирован", user: user, token: token })
    }
}