const config = require('./config.js')

const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,{
        host: config.HOST,
        dialect: config.dialect,
        port: 3306,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
          }
    },
)

sequelize.authenticate()
.then(()=>{
    console.log('connected')
}).catch( err =>{
    console.error(err)
})

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

db.user = require('./userModel.js')(sequelize, DataTypes)

db.sequelize.sync({alter: true})
.then(()=>{
    console.log('sync success!!!')
}).catch((e)=>{
    console.error(e)
})

module.exports  = db