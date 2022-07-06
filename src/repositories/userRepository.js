import connection from "../database.js";
import bcrypt from "bcrypt";

async function getUserByEmail(email) {

    return await connection.query(
        `SELECT * FROM "users" WHERE "email"=$1`,
        [email]
    )
}

async function insertUser(name, email, password) {

    const hashedPassword = bcrypt.hashSync(password, 12);
  
    return await connection.query(
        `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
        [name, email, hashedPassword]
    );
}

async function findUserToComparePassword(email) {

    const { rows } = await connection.query(
        `SELECT * FROM "users" WHERE "email"=$1`,
        [email]
    );
    const [user] = rows;

    return user;
}

export { getUserByEmail, insertUser, findUserToComparePassword };