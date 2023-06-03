import { db } from "@/lib/db";
import bcrypt from 'bcrypt';
import FormatFormData from "@/lib/FormatFormData";
import path from "path";

export const config = {
    api: {
        bodyParser: false
    }
}

export default async function handler(req, res) {

    const COMMON_UPLOAD_PATH = "/public/uploads";

    try {
        switch (req.method) {
            case 'POST':

                const { fields, files } = await FormatFormData(req, {
                    saveLocally: true,
                    uploadPath: path.join(process.cwd() || process.env.ROOT_DIR, COMMON_UPLOAD_PATH, "/users"),
                    multiples: true
                })

                const { name, email, mobile, password } = fields;

                const user_img = files.user_img.newFilename;

                const checkUser = await db({
                    sql: 'SELECT * FROM users WHERE email = ?',
                    values: [email]
                });

                if (checkUser.length > 0) return res.status(409).json("User already exists!");

                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);

                const register = await db({
                    sql: 'INSERT INTO users (name, email, mobile, password, user_img) VALUES (?,?,?,?,?)',
                    values: [name, email, mobile, hash, user_img]
                });

                if (register.affectedRows > 0) {
                    res.status(200).json('User Registered Successfully');
                }
                else {
                    res.status(403).json('Error in Registration!');
                }

                break;

            default:
                res.status(400).json('Method is not valid!');
        }
    } catch (error) {
        console.log(error)
        res.status(500).json("Server side Error!")
    }

}