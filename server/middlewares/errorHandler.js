module.exports = (err, req, res, next) => {
    let status = ''
    let message = ''
    switch(err.name){
        case 'JsonWebTokenError':
            status = 401
            message = 'you need to login first'
            break
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            status = 400
            message = err.errors[0].message
            break
        default:
            if(err.status){
                status = err.status
                message = err.message
            }else{
                status = 500
                message = 'internal server error'
            }
            break
    }
    res.status(status).json({
        message
    })
}