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

        const query='select * from users where id <> :0'
        const params=[data.user_id]
        var result=await this.query(query,params)

        var allResult=await Promise.all(result.data.map(async (d,i)=>{
            var obj={
                id:d.ID,
                name:d.NAME,
                image:images[i%4]
            }
            const inboxQuery=`select froms.user_id as sender_id,messages.place_id,messages.msg as msg,inboxes.id, senders_receivers.timestamp as timestamp from inboxes,messages,senders_receivers,froms where inboxes.uid_1 = :0 and inboxes.uid_2 = :1 and inboxes.id=messages.place_id and senders_receivers.message_id = messages.id and senders_receivers.sender_id=froms.sender_id order by timestamp desc`
            const inboxParams=[Math.min(data.user_id,d.ID),Math.max(data.user_id,d.ID)]
            var inboxResult=await this.query(inboxQuery,inboxParams)
            if(inboxResult.data.length>0) {
                obj['isConnected'] = true
                obj['message']={
                    text:inboxResult.data[0].MSG,
                    timestamp:inboxResult.data[0].TIMESTAMP,
                    seen:false,
                    own:inboxResult.data[0].SENDER_ID===data.user_id
                }
            }
            else {
                obj['isConnected']=false
                obj['message']={
                    text:'Not connected yet',
                    timestamp:0,
                    seen:true,
                    own:true
                }
            }
            return obj
        }))

        console.log(allResult)

        allResult=allResult.sort((a, b) => b.message.timestamp-a.message.timestamp);

        return {
            success:true,
            data:allResult
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
