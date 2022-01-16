const Repository = require('./connection').Repository
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const tokenExpiryDuration=86400

class AuthRepository extends Repository{
    constructor() {
        super();
    }

    reg=async data=>{
        const findQuery='select * from users where login = :0'
        const findParams=[data.login]
        var findResult=await this.query(findQuery,findParams)
        if(findResult.data.length>0)
            return {
                success:false
            }
        const query='insert into users (type,name,login,pass) values (:0,:1,:2,:3)'
        const params=[data.type,data.name,data.login,bcrypt.hashSync(data.pass, 10)]
        var result=await this.query(query,params)
        return result
    }

    login=async data=>{
        const findQuery='select * from users where login = :0'
        const findParams=[data.login]
        var findResult=await this.query(findQuery,findParams)
        if(findResult.data.length==0)
            return {
                success:false
            }

        const dbPass=findResult.data[0]['PASS']
        if(bcrypt.compareSync(data.pass, dbPass)) {
            //signing a token with necessary information for validation
            var token = jwt.sign({
                id: findResult.data[0]['ID'],
                login: data.login,
                pass: dbPass,
                type:findResult.data[0]['TYPE']
            }, process.env.jwt_secret, {expiresIn: `${tokenExpiryDuration}s`})
            return {
                success: true,
                token: token
            }
        }
        return {
            success:false
        }
    }

    changePass=async data=>{
        const findQuery='select * from users where id = :0'
        const findParams=[data.user_id]
        var findResult=await this.query(findQuery,findParams)
        if(findResult.data.length==0)
            return {
                success:false
            }
        const dbPass=findResult.data[0]['PASS']
        if(bcrypt.compareSync(data.old_pass, dbPass)) {
            const query = 'update users set pass = :0 where id = :1'
            var newPassHash=bcrypt.hashSync(data.new_pass, 10)
            const params = [newPassHash,data.user_id]
            var result = await this.query(query, params)
            if(result.success){
                var token = jwt.sign({
                    id: findResult.data[0]['ID'],
                    login: findResult.data[0]['LOGIN'],
                    pass: newPassHash,
                    type:findResult.data[0]['TYPE']
                }, process.env.jwt_secret, {expiresIn: `${tokenExpiryDuration}s`})
                return {
                    success: true,
                    token: token
                }
            }
            return result
        }
        return {
            success:false
        }
    }

    tokenValidity=async (id,login,pass)=>{
        const findQuery='select * from users where id = :0 and login = :1 and pass = :2'
        const findParams=[id,login,pass]
        var findResult=await this.query(findQuery,findParams)
        return findResult.data.length!==0
    }

    list=async data=>{
        const query='select * from users where id <> :0'
        const params=[data.user_id]
        var result=await this.query(query,params)
        return result
    }

    delete=async id=>{
        const query='delete from users where id = :0'
        const params=[id]
        var result=await this.query(query,params)
        return result
    }

}

module.exports=AuthRepository