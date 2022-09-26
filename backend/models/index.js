const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('budgetmanagement', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
  });


sequelize.authenticate().then(()=>{
  console.log('Connection succesfull')
}).catch((err)=>{
  console.log(err)
})
const db = {}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.operations = require('./operation.js')(sequelize, Sequelize.DataTypes)
db.users = require('./user.js')(sequelize, Sequelize.DataTypes);
db.categories = require('./category.js')(sequelize, Sequelize.DataTypes);




//associations

//asociation between operation and user (one-to-many)
db.users.hasMany(db.operations,{
  foreignKey: {
    name: 'userId',
    allowNull: false
  },
  as: 'operation'
})

db.operations.belongsTo(db.users,{
  foreignKey: {
    name: 'userId',
    allowNull: false
  },
  as: 'user'
})


//asociation between operation and category (one-to-many)
db.operations.belongsTo(db.categories, {
  foreignKey: {
    name:'categoryId',
    allowNull: false
  },
  as: 'category'
}) 

db.categories.hasMany(db.operations,{
  foreignKey: {
    name:'categoryId',
    allowNull: false
  },
  as: 'operation'
})

module.exports = db;