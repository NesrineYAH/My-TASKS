// models/taskList.model.js
module.exports = (sequelize, DataTypes) => {
  const TaskList = sequelize.define("TaskList", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  TaskList.associate = (models) => {
    TaskList.hasMany(models.Task, {
      foreignKey: "listId",
      as: "tasks",
    });
  };

  return TaskList;
};
