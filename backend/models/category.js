

module.exports = (sequelize, DataTypes)=>{
    const Category = sequelize.define('category',{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    },{
        timestamps:false
    });
    
    return Category;
} 