const sequelize = require('../config/db')
const {DataTypes} = require('sequelize')

const Singer = sequelize.define('singer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true}
})

const Track = sequelize.define('track', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true}

})


Singer.hasMany(Track)
Track.belongsTo(Singer)




module.exports = {
    Track,
    Singer
   
}
