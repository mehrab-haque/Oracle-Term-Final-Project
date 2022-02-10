const Repository = require('./connection').Repository

class profileRepository extends Repository{
    constructor() {
        super();
    }

    list=async (data)=>{
        const query='select id,name,status,image from users where id=:0'
        const params=[data.user_id]
        var result=await this.query(query,params)
console.log(result.data[0].NAME)
        return {

success:true,
data:{

id:result.data[0].ID,
name:result.data[0].NAME,
status:result.data[0].STATUS,
image:result.data[0].IMAGE



}
}
    }

 

}

module.exports = profileRepository