const { User, Task } = require('../models')

class TaskController{
    static async getAll (req, res, next){
        try{
            const tasks = await Task.findAll({
                include: {
                    model: User,
                    attributes: ['id','fullname','organization','email'],
                    where: {
                        organization: req.userData.organization
                    }
                }
            })
            res.status(200).json({
                tasks
            })
        }catch(err){
            console.log(err);
            
            next(err)
        }
    }

    static async getById (req, res, next){
        try{
            const task = await Task.findByPk(req.params.id)
            res.status(200).json(task)
        }catch(err){
            next(err)
        }
    }

    static async create (req, res, next){
        try{
            const { title, category } = req.body
            const newTask = await Task.create({
                title,
                category,
                UserId: req.userData.id
            })
            res.status(201).json(newTask)
        }catch(err){
            console.log(err)
            next(err)
        }
    }

    static async update (req, res, next){
        try{
            const { id } = req.params
            const { title, category } = req.body
            const task = {
                title,
                category
            }
            const updated = await Task.update(task, {
                where: { id },
                returning: true
            })
            res.status(200).json(updated[1][0])
        }catch(err){
            next(err)
        }
    }

    static async delete (req, res, next){
        try{
            const { id } = req.params
            const deleted = await Task.destroy({
                where: { id }
            })
            res.status(200).json({
                message: 'Success deleting task'
            })
        }catch(err){
            next(err)
        }
    }
}

module.exports = TaskController