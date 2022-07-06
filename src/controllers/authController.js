import { insertUser } from "../repositories/userRepository.js";

async function signUp(req, res) {

    const {name, email, password} = req.body;

    try { 
      insertUser(name, email, password);
      return res.sendStatus(201);

    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
}

async function signIn(req, res) {

    const { email, password } = req.body;

    try {
        
      const { user } = res.locals;
  
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET
      );
  
      res.send({
        token,
      });

    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
}

export { signUp, signIn };