

module.exports = (sequelize, DataTypes)=>{

    const Operation = sequelize.define('operation', {
        concept: DataTypes.STRING,
        amount: DataTypes.FLOAT,
        date: DataTypes.DATE,
        type: DataTypes.STRING,
    },{});

    return Operation;
}