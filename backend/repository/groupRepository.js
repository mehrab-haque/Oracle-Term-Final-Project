const Repository = require('./connection').Repository
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const tokenExpiryDuration=86400

class GroupRepository extends Repository{
    constructor() {
        super();
    }

    create=async data=>{

        const placeCreateQuery=`insert into places (type) values (:0)`
        const placeCreateParams=[2]
        const placeCreateResult=await this.query(placeCreateQuery,placeCreateParams)

        const placeIdQuery=`select max(id) as id from places`
        const placeIdParams=[]
        const placeIdResult=await this.query(placeIdQuery,placeIdParams)
        const placeId= placeIdResult.data[0].ID;

        const groupCreateQuery=`insert into groups (id,name,image,timestamp,created_by) values (:0,:1,:2,:3,:4)`
        const groupCreateParams=[placeId,data.name,data.image,parseInt(Date.now()/1000),data.user_id]
        const groupCreateResult=await this.query(groupCreateQuery,groupCreateParams)

        const memberCreateQuery=`insert into members (user_id,group_id,timestamp) values (:0,:1,:2)`
        const memberCreateParams=[data.user_id,placeId,parseInt(Date.now()/1000)]
        const memberCreateResult=await this.query(memberCreateQuery,memberCreateParams)

        return {
            success:true,
            data:{}
        }
        // const findQuery='select * from users where login = :1'
        // const findParams=[data.login]
        // var findResult=await this.query(findQuery,findParams)
        // if(findResult.data.length>0)
        //     return {
        //         success:false
        //     }
        // const query='insert into users (name,login,pass) values (:0,:1,:2)'
        // const params=[data.name,data.login,bcrypt.hashSync(data.pass, 10)]
        // var result=await this.query(query,params)
        // return result
    }

}

module.exports=GroupRepository
