const Repository = require('./connection').Repository
const GroupRepository=require('./groupRepository')
const {socketUserTable, io} = require("../app");

const groupRepository=new GroupRepository()


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

    listForMessage=async data=>{
        const query=`select users.name,users.image,users.id,reacts.reaction_id from users,reacts where users.id=reacts.user_id and reacts.message_id = :0`
        const params=[data.msgId]
        var result=await this.query(query,params)
        var array=[]
        result.data.map(r=>{
            array.push({
                user_id:r.ID,
                image:r.IMAGE,
                name:r.NAME,
                reaction_id:r.REACTION_ID,
                own:r.ID===data.user_id
            })
        })
        return {
            data:array,
            success:true
        }
    }

    create=async data=>{

        const deleteQuery=`delete from reacts where user_id = :0 and message_id = :1`
        const deleteParamas=[data.user_id,data.msgId]
        await this.query(deleteQuery,deleteParamas)

        if(!data.already){
            const query='insert into reacts (message_id,user_id,reaction_id,timestamp) values (:0,:1,:2,:3)'
            const params=[data.msgId,data.user_id,data.reactionId,parseInt(Date.now()/1000)]
            var result=await this.query(query,params)
        }


        const placeQuery=`select places.id,places.type from places,messages where messages.place_id=places.id and messages.id = :0`
        const placeParams=[data.msgId]
        const placeResult=await this.query(placeQuery,placeParams)

        if(placeResult.data[0].TYPE===2){
            var groupMembersResult=await groupRepository.members({
                groupId:placeResult.data[0].ID,
                user_id:data.user_id
            })
            var newReactResult=await this.listForMessage(data)
            groupMembersResult.data.map((m,i)=>{
                if(m.USER_ID+'' in socketUserTable){
                    socketUserTable[m.USER_ID+''].map(async sid=>{
                        await io.to(sid).emit('update_reacts', {
                            msgId:data.msgId,
                            data:newReactResult
                        });
                    })
                }
            })
        }else{
            const inboxQuery=`select * from inboxes where id = :0`
            const inboxParams=[placeResult.data[0].ID]
            const inboxResult=await this.query(inboxQuery,inboxParams)
            var users=[inboxResult.data[0].UID_1,inboxResult.data[0].UID_2]
            var newReactResult=await this.listForMessage(data)
            users.map(uid=>{
                if(uid+'' in socketUserTable){
                    socketUserTable[uid+''].map(async sid=>{
                        await io.to(sid).emit('update_reacts', {
                            msgId:data.msgId,
                            data:newReactResult
                        });
                    })
                }
            })

        }

        return {
            success:true,
            data:{}
        }
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
