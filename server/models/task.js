'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Task extends Model{}
  Task.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    category: {
      allowNull: false,
      type: DataTypes.ENUM('backlog','todo','doing','done'),
      validate: {
        checkCategory() {
          const list = ['backlog', 'todo', 'doing', 'done'];
          if(!list.includes(this.category)){
            throw new Error('Category must be : backlog, todo, doing, done')
          }
        }
      }
    },
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'Cascade',
      onDelete: 'Cascade'
    }
  }, {
    sequelize
  })
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User)
  };
  return Task;
};