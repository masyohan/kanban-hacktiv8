const { User } = require('../models')
const  { compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

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
}

module.exports = UserController