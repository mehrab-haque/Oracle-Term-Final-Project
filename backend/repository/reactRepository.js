const Repository = require('./connection').Repository

class ReactRepository extends Repository{
    constructor() {
        super();
    }

    get=async ()=>{
        const query='select * from reactions'
        const params=[]
        var result=await this.query(query,params)
        return {
       success:true,
       data:result.data

		}
	    }

    create=async data=>{
        const query='insert into reacts (message_id,user_id,reaction_id,timestamp) values (:0,:1,:2,:3)'
        const params=[data.msgId,data.user_id,data.reactionId,parseInt(Date.now()/1000)]
        var result=await this.query(query,params)
        return result
    }

    update=async (id,data)=>{
        const query='update items set name = :0 where id = :1'
        const params=[data.name,id]
        var result=await this.query(query,params)
        return result
    }

    delete=async id=>{
        const query='delete from items where id = :0'
        const params=[id]
        var result=await this.query(query,params)
        return result
    }

}

module.exports = ReactRepository