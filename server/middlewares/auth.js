const { User, Task } = require('../models')
const { verifyToken } = require('../helpers/jwt')

const authentication = async (req, res, next) => {
    try{
        const { access_token } = req.headers
        const userData = verifyToken(access_token)
        const isValidUser = await User.findByPk(userData.id)
        if(!isValidUser){
            throw({
                status: 401,
                message: 'you are not authorized'
            })
        }else{
            userData.organization = isValidUser.organization
            req.userData = userData
            next()  
        }
    }catch(err){
        next(err)
    }
}

const authorization = async (req, res, next) => {
    try{
        const { id } = req.params
        const task = await Task.findByPk(id)
        if(task){
            if(task.UserId == req.userData.id){
                req.currentTask = task
                next()
            }else{
                throw({
                    status: 401,
                    message: 'you are not authorized'
                })
            }
        }else{
            throw({
                status: 404,
                message: 'task not found'
            })
        }
    }catch(err){
        next(err)
    }
}

module.exports = {
    authentication,
    authorization
}