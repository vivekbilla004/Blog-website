const jwt = require("jsonwebtoken")

const secret = "@$commonMan12"

function createToken (user) {
    const payload = {

       id:  user._id,
       fullName : user.fullName ,
        email: user.email,
        profileImage: user.profileImage,
        role : user.role,
    }
    const token = jwt.sign(payload,secret)
    return token ;
}

function validatetoken(token){
    const payload = jwt.verify(token,secret);
    return payload ;
}

module.exports = {
    createToken,
    validatetoken
}