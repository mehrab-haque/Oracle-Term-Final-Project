const jwt = require('jsonwebtoken');
const AuthRepository=require('../repository/authRepository')

const authRepository=new AuthRepository()

async function tokenValidationMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(403).send({error:'access denied'})
    jwt.verify(token, process.env.jwt_secret, async (err, user) => {
        if (err || !('login' in user)) return res.status(403).send({error: 'access denied'})
        var isValid = await authRepository.tokenValidity(user.id,user.login,user.pass) //checking whether the current password is the same
        if(!isValid) return res.status(403).send({error: 'access denied'})
        req.body['user_id'] = user.id
        next()
    })
}

module.exports=tokenValidationMiddleware