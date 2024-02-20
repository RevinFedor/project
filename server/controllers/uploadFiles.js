import { sql } from "../db.js"

export async function uploadFiles(req, res) {
    try {
        const { numberCar, addres, date, files, userId } = req.body
        const filename = req.file.filename
        console.log({ filename, file: req.file });
        const data = await sql`insert into Requests (numberCar, addres, date, image, userId, statusId) values (${numberCar}, ${addres}, ${date}, ${filename}, ${userId}, 1) RETURNING *`
        console.log({ data });
        res.send(data)
    } catch (error) {
        res.status(400).send({ error })
    }
}
