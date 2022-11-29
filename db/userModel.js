module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define("user",{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoincrement: true
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName:{
            type: DataTypes.STRING,
        },
        lastName:{
            type: DataTypes.STRING,
        },
        age:{
            type: DataTypes.INTEGER
        }
    },
    {
        freezeTableName: true
    })
    return User
}