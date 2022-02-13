const Repository = require('./connection').Repository

const images=[
    'https://lh3.googleusercontent.com/a-/AOh14Gjr523lB_RN2WkIOHWARbREFhG4cV2rEY0nkCH5Gg=s96-c',
    'https://lh3.googleusercontent.com/a-/AOh14GjH-HzfS5beIuhT03W9BbQlOXGoWPLK290TDDLo2A=s96-c',
    'https://lh3.googleusercontent.com/a-/AOh14Gjp7yKADoa70L0141Vj66Bqp9EBURBI6gRbe28q=s96-c',
    'https://lh3.googleusercontent.com/a-/AOh14GhjRq35rXu6OozGGkeA5x3HWf3lMPIxW7faK69vpg=s96-c'
]

class UsersRepository extends Repository{
    constructor() {
        super();
    }
 

    list=async data=>{
        //console.log(data.user_id)
        // const inboxQuery=`select messages.place_id, messages.msg, max(senders_receivers.timestamp)  from messages, senders_receivers where messages.place_id in (select id from inboxes where uid_1 = :0 or uid_2 = :1) and messages.id = senders_receivers.message_id group by messages.place_id, messages.msg`
        // const inboxParams=[data.user_id,data.user_id]
        // const inboxResult=await this.query(inboxQuery,inboxParams)
        // console.log(inboxResult)

        const query='select * from users'
        const params=[]
        var result=await this.query(query,params)

        var allResult=await Promise.all(result.data.map(async (d,i)=>{
            var obj={
                id:d.ID,
                name:d.NAME,
                image:images[i%4]
            }
            const inboxQuery=`select id from inboxes where uid_1 = :0 and uid_2 = :1`
            const inboxParams=[Math.min(data.user_id,d.ID),Math.max(data.user_id,d.ID)]
            var inboxResult=await this.query(inboxQuery,inboxParams)
            if(inboxResult.data.length===0)
                obj['isConnected']=false
            else obj['isConnected']=true
            return obj
        }))

        console.log(allResult)

        return {
            success:true,
            data:await result.data.map((d,i)=>{
                return {
                    id:d.ID,
                    name:d.NAME,
                    image:images[i%4],
                    isConnected:false,
                    message:{
                        text:'hello world',
                        timestamp:Date.now(),
                        seen:i%2===0
                    }
                }
            })
        }
    }

    create=async data=>{
        const query='insert into items (name) values (:0)'
        const params=[data.name]
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

module.exports = UsersRepository
