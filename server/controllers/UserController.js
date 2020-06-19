const { User } = require('../models')
const  { compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController{
    static async register (req, res, next){
        try{
            const { email, fullname, password } = req.body
            const newUser = await User.create({
                email,
                fullname,
                password
            })
            res.status(201).json({
                id: newUser.id,
                email
            })
        }catch(err){
            console.log(err)
            next(err)
        }
    }

    static async login (req, res, next){
        try{
            const { email, password } = req.body
            console.log(email, password)
            const user = await User.findOne({
                where: { email }
            })
            if(user){
                const isValid = compare(password, user.password)
                if(isValid){
                    const access_token = generateToken({
                        id: user.id,
                        email: user.email
                    })
                    res.status(200).json({
                        access_token
                    })
                }else{
                    throw({
                        status: 400,
                        message: 'wrong email / password'
                    })
                }
            }else{
                throw({
                    status: 400,
                    message: 'wrong email / password'
                })
            }
        }catch(err){
            console.log(err)
            next(err)
        }
    }

    static googleUser(req, res, next) {
        const token = req.body.id_token
        let recent_email = null

        client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            const payload = ticket.getPayload();
            console.log(payload)
            recent_email = payload.email;
            return User.findOne({
                where: { email: recent_email }
            })
        })
        .then( isUser => {
            if (isUser) {
                const accessToken = generateToken( {id: isUser.id, email: isUser.email} )
                res.status(200).json({ 
                    email: isUser.email,
                    accessToken 
                })
                return
            } else { 
                return User.create({
                    email: recent_email,
                    fullname: req.body.fullname,
                    password: 'defaultPassword'
                })
            }
        })
        .then(newUser =>{
            const accessToken = generateToken( {id: newUser.id, email: newUser.email} )
            res.status(200).json({
                email: newUser.email,
                accessToken
            })
        })
        .catch(err => {
            console.log(err);
            next(err)
        })        
    }
}

module.exports = UserController