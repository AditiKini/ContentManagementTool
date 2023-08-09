import User from "../model/user.js";
import bcrypt from 'bcrypt';
import authJWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from "../model/token.js";

dotenv.config();


export const userSignUp = async (req, res) => {
   try {
      const salt = await bcrypt.genSalt();
      const encryptedPass = await bcrypt.hash(req.body.password, salt);

      const userdetail = { username: req.body.username, name: req.body.name, password: encryptedPass };

      const newUser = new User(userdetail);
      await newUser.save();

      return res.status(200).json({ msg: "Sign up Successfully" });
   } catch (error) {
      return res.status(500).json({ msg: "Error while signup the user" });
   }
}

export const loginUser = async (req, res) => {
   let user = await User.findOne({ username: req.body.username });

   if (!user) {
      return res.status(400).json({ msg: "username doesn't match" });
   }
   
   try {
      let ismatch = await bcrypt.compare(req.body.password, user.password)
      if (ismatch) {
         const accessToken = authJWT.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
         const refreshToken = authJWT.sign(user.toJSON(), process.env.REFRESH_SECREY_KEY);

         const newToken = new Token({token : refreshToken});
         await newToken.save();

         return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username })
 
      }
      else {
         return res.status(400).json({ msg: "Password doesn't match" });
      }
   }
   catch (error) {
      res.status(500).json({ msg: 'error while login the user' });
   }
}

// request = data which coming form frontend like headers body
// response = backend to frontend