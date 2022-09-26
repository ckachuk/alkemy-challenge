

module.exports = (sequelize, DataTypes)=>{

    const Operation = sequelize.define('operation', {
        concept: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount:  {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        date:  {
            type: DataTypes.DATE
        },
        type: {
            type: DataTypes.STRING
        },
    },{});

    return Operation;
}