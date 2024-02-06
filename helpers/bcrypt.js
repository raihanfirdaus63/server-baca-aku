const bcrypt = require('bcrypt')

const hashPassword = (plainPass)=>{
    return bcrypt.hashSync(plainPass, bcrypt.genSaltSync(8))
}
const comparePassword = (plainPass, pass)=>{
    return bcrypt.compareSync(plainPass, pass)
}
module.exports ={
    hashPassword,
    comparePassword
}