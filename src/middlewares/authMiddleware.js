import { getUserByEmail, findUserToComparePassword } from "../repositories/userRepository.js";

async function validateSignUp(req, res, next) {

    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
        return res.sendStatus(422);
    }

    const existingUsers = getUserByEmail(email);
    if (existingUsers.rowCount > 0) {
        return res.sendStatus(409);
    }

    return next();
}

async function validateSignIn(req, res, next) {

    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.sendStatus(422);
    }

    const user = findUserToComparePassword(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.sendStatus(401);
    }

    res.locals.user = user;

    return next();
}

export { validateSignUp, validateSignIn };