const Repository = require('./connection').Repository
const GroupRepository=require('./groupRepository')
const {io, socketUserTable} =require('../app')

const groupRepository=new GroupRepository()

class MessagesRepository extends Repository {
    constructor() {
        super();
    }
    getMessages = async (data, id) => {
        const query = 'select id from inboxes where uid_1=:0 and uid_2 =:1';
        const params = [Math.min(data.user_id, id), Math.max(data.user_id, id)]
        var result = await this.query(query, params)
        //console.log(result.data)
        if (result.data.length == 0) {

            return {
                success: true,
                data: []
            }
        }
        var placeId = result.data[0].ID;
        const msgQuery = 'select messages.id,messages.msg,senders_receivers.timestamp,froms.user_id from messages,senders_receivers,froms  where  messages.place_id =:0  and senders_receivers.message_id=messages.id and froms.sender_id=senders_receivers.sender_id order by senders_receivers.timestamp ';
        const msgParams = [placeId];
        var msgResult = await this.query(msgQuery, msgParams)
        var allRes;
        allRes = msgResult.data.map(d => {
            var obj = {
                id:d.ID,
                msg: d.MSG,
                timestamp: d.TIMESTAMP,
                isConnected: true
            }

            if (d.USER_ID === data.user_id) {
                obj['own'] = true;

            } else {
                obj['own'] = false;
            }
            return obj;
        })
        return {
            success: true,
            data: allRes
        }
    }

    getGroupMessages = async (data, id) => {
        var placeId = id;
        const msgQuery = 'select messages.id,messages.msg,senders_receivers.timestamp,froms.user_id from messages,senders_receivers,froms  where  messages.place_id =:0  and senders_receivers.message_id=messages.id and froms.sender_id=senders_receivers.sender_id order by senders_receivers.timestamp ';
        const msgParams = [placeId];
        var msgResult = await this.query(msgQuery, msgParams)
        var allRes;
        allRes = msgResult.data.map(d => {
            var obj = {
                id:d.ID,
                msg: d.MSG,
                timestamp: d.TIMESTAMP,
                isConnected: true
            }

            if (d.USER_ID === data.user_id) {
                obj['own'] = true;

            } else {
                obj['own'] = false;
            }
            return obj;
        })
        //console.log(allRes)
        return {
            success: true,
            data: allRes
        }
    }

    send = async (data) => {
        let placeId;
        let senderId;
        var groupMembersResult
        var receiverId=null;
        if(data.type===1){
            //console.log('finding inbox')
            const inboxFindQuery = `select count(*) as count from inboxes where uid_1 = :0 and uid_2 = :1`
            const inboxFindParams = [Math.min(data.user_id, data.to), Math.max(data.user_id, data.to)]
            const inboxFindResult = await this.query(inboxFindQuery, inboxFindParams);

            //console.log(inboxFindQuery)
            //console.log(inboxFindParams)
            //console.log(inboxFindResult)

            if (inboxFindResult.data[0].COUNT === 0) {
                //console.log('creating place')
                const placeCreateQuery = `insert into places (type) values (:0)`
                const placeCreateParams = [1]
                await this.query(placeCreateQuery, placeCreateParams)

                //console.log('fetching insert id')
                const placeIdQuery = `select max(id) as id from places`
                const placeIdParams = []
                const placeIdResult = await this.query(placeIdQuery, placeIdParams)
                placeId = placeIdResult.data[0].ID;
                //console.log("place- created>", placeId);

                //console.log('inbox create')
                const inboxCreateQuery = `insert into inboxes (id,uid_1,uid_2,timestamp,created_by) values (:0 , :1 , :2 , :3 , :4)`
                const inboxCreateParams = [placeIdResult.data[0].ID, Math.min(data.user_id, data.to), Math.max(data.user_id, data.to), parseInt(Date.now() / 1000), data.user_id]
                const inboxCreateResult = await this.query(inboxCreateQuery, inboxCreateParams)
            } else {
                const inboxFindQuery = `select id from inboxes where uid_1 = :0 and uid_2 = :1`
                const inboxFindParams = [Math.min(data.user_id, data.to), Math.max(data.user_id, data.to)]
                const inboxFindResult = await this.query(inboxFindQuery, inboxFindParams);

                placeId = inboxFindResult.data[0].ID;
                //console.log("place-found>", placeId);

            }
        }else{
            placeId=data.to
        }
        //console.log('from find')
        const fromFindQuery = `select count(*) as count from froms where user_id = :0`
        const fromFindParams = [data.user_id]
        const fromFindResult = await this.query(fromFindQuery, fromFindParams)
        if (fromFindResult.data[0].COUNT === 0) {
            //console.log('create sender')
            const senderCreateQuery = `insert into senders (type) values (:0)`
            const senderCreateParams = ['sender']
            await this.query(senderCreateQuery, senderCreateParams)

            //console.log('insert id')
            const senderIdQuery = `select max(id) as id from senders`
            const senderIdParams = []
            const senderIdResult = await this.query(senderIdQuery, senderIdParams)
            senderId = senderIdResult.data[0].ID;
            //console.log('create from')
            const fromCreateQuery = `insert into froms (user_id,sender_id) values (:0 , :1)`
            const fromCreateParams = [data.user_id, senderIdResult.data[0].ID]
            const fromCreateResult = await this.query(fromCreateQuery, fromCreateParams)
        } else {
            const senderFindQuery = `select sender_id as id from froms where user_id=:0`
            const senderFindParams = [data.user_id]
            const senderFindResult = await this.query(senderFindQuery, senderFindParams);

            senderId = senderFindResult.data[0].ID;

        }

        if(data.type===1){
            //console.log('to find')
            const toFindQuery = `select count(*) as count from tos where user_id = :0`
            const toFindParams = [data.to]
            const toFindResult = await this.query(toFindQuery, toFindParams)
            if (toFindResult.data[0].COUNT === 0) {
                //console.log('reciever create')
                const receiverCreateQuery = `insert into receivers (type) values (:0)`
                const receiverCreateParams = ['receiver']
                await this.query(receiverCreateQuery, receiverCreateParams)

                //console.log('reciever id')
                const receiverIdQuery = `select max(id) as id from receivers`
                const receiverIdParams = []
                const receiverIdResult = await this.query(receiverIdQuery, receiverIdParams)

                receiverId = receiverIdResult.data[0].ID;
                //console.log('create to')
                const toCreateQuery = `insert into tos (user_id,receiver_id) values (:0 , :1)`
                const toCreateParams = [data.to, receiverIdResult.data[0].ID]
                const toCreateResult = await this.query(toCreateQuery, toCreateParams)
            } else {
                const receiverFindQuery = `select receiver_id as id from tos where user_id=:0`
                const receiverFindParams = [data.to]
                const receiverFindResult = await this.query(receiverFindQuery, receiverFindParams);

                receiverId = receiverFindResult.data[0].ID;
            }

        }else{
            if('tos' in data){

            }else{
                groupMembersResult=await groupRepository.members({
                    groupId:data.to,
                    user_id:data.user_id
                })

                //recievers tos check
                var query=``
                groupMembersResult.data.map((m,i)=>{
                    query+=`select receiver_id from tos where user_id = ${m.USER_ID}`
                    if(i!==groupMembersResult.data.length-1)query+=` INTERSECT `
                })

                const query1=`select receiver_id, count(user_id) as n from tos where receiver_id in (${query}) group by receiver_id`
                const result1=await this.query(query1,[])

                result1.data.map(r=>{
                    if(r.N===groupMembersResult.data.length)
                        receiverId=r.RECEIVER_ID
                })

                if(receiverId===null){
                    //console.log('reciever create')
                    const receiverCreateQuery = `insert into receivers (type) values (:0)`
                    const receiverCreateParams = ['receiver']
                    await this.query(receiverCreateQuery, receiverCreateParams)

                    //console.log('reciever id')
                    const receiverIdQuery = `select max(id) as id from receivers`
                    const receiverIdParams = []
                    const receiverIdResult = await this.query(receiverIdQuery, receiverIdParams)

                    receiverId = receiverIdResult.data[0].ID;

                    await Promise.all(groupMembersResult.data.map(async m=>{
                        //console.log('create to')
                        const toCreateQuery = `insert into tos (user_id,receiver_id) values (:0 , :1)`
                        const toCreateParams = [m.USER_ID, receiverId]
                        await this.query(toCreateQuery, toCreateParams)
                    }))

                }
            }
        }

        const msgQuery = `insert into messages (msg,place_id,is_deleted,is_forwarded) values(:0,:1,:2,:3)`
        const msgParams = [data.body, placeId, 0, 0];
        const msgResult = await this.query(msgQuery, msgParams);


        const msgIdQuery = `select max(id) as id from messages`
        const msgIdParams = [];
        const msgIdResult = await this.query(msgIdQuery, msgIdParams);

        const senders_receiversQuery = `insert into senders_receivers (message_id,sender_id,receiver_id,timestamp) values(:0,:1,:2,:3)`
        const senders_receiversParams = [msgIdResult.data[0].ID, senderId, receiverId, parseInt(Date.now() / 1000)];
        const senders_receiversResult = await this.query(senders_receiversQuery, senders_receiversParams);
        //console.log("done");
        //console.log(senders_receiversParams)

        if(data.type===1){
            if(data.to in socketUserTable){
                socketUserTable[data.to].map(async sid=>{
                    await io.to(sid).emit('message', {
                        id:msgIdResult.data[0].ID,
                        to:data.to,
                        type:data.type,
                        body:data.body,
                        timestamp:Date.now(),
                        from:data.user_id
                    });
                })
            }
            if(data.user_id in socketUserTable){
                socketUserTable[data.user_id].map(async sid=>{
                    await io.to(sid).emit('message_own', {
                        id:msgIdResult.data[0].ID,
                        to:data.to,
                        type:data.type,
                        body:data.body,
                        timestamp:Date.now(),
                        from:data.user_id
                    });
                })
            }

        }else{
            if(data.user_id in socketUserTable){
                socketUserTable[data.user_id].map(async sid=>{
                    await io.to(sid).emit('message_own_group', {
                        id:msgIdResult.data[0].ID,
                        to:data.to,
                        type:data.type,
                        body:data.body,
                        timestamp:Date.now(),
                        from:data.user_id
                    });
                })
            }

            if('tos' in data){

            }else{
                groupMembersResult.data.map((m,i)=>{
                    if(m.USER_ID!==data.user_id && m.USER_ID+'' in socketUserTable){
                        console.log(m.USER_ID)
                        socketUserTable[m.USER_ID+''].map(async sid=>{
                            await io.to(sid).emit('message_group', {
                                id:msgIdResult.data[0].ID,
                                to:m.USER_ID,
                                type:data.type,
                                body:data.body,
                                timestamp:Date.now(),
                                from:data.user_id,
                                groupId:data.to
                            });
                        })
                    }
                })
            }
        }

        //resolving replies
        var reqArr=[]
        data.replies.map(r=>{
            var query=`insert into replies (msg_id_1,msg_id_2,timestamp) values (:0 , :1 , :2)`
            var params=[r.id,msgIdResult.data[0].ID,parseInt(Date.now()/1000)]
            reqArr.push(this.query(query,params))
        })

        await Promise.all(reqArr)

        return {
            success: true,
            data: {}
        }
    }

    replies=async id=>{
        var query=`select messages.id,messages.msg from messages,replies where messages.id=replies.msg_id_1 and replies.msg_id_2 = :0`
        var params=[id]
        var result=await this.query(query,params)
        return result
    }


}

module.exports = MessagesRepository
