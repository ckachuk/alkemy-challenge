

module.exports = (sequelize, DataTypes)=>{

    const Operation = sequelize.define('operation', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
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