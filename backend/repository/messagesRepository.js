const Repository = require('./connection').Repository

class MessagesRepository extends Repository {
    constructor() {
        super();
    }

    send = async (data) => {


        console.log('finding inbox')
        const inboxFindQuery=`select count(*) as count from inboxes where uid_1 = :0 and uid_2 = :1`
        const inboxFindParams=[Math.min(data.user_id,data.to),Math.max(data.user_id,data.to)]
        const inboxFindResult=await this.query(inboxFindQuery,inboxFindParams)
        if(inboxFindResult.data[0].COUNT===0){
            console.log('creating place')
            const placeCreateQuery=`insert into places (type) values (:0)`
            const placeCreateParams=[1]
            await this.query(placeCreateQuery,placeCreateParams)

            console.log('fetching insert id')
            const placeIdQuery=`select max(id) as id from places`
            const placeIdParams=[]
            const placeIdResult=await this.query(placeIdQuery,placeIdParams)

            console.log('inbox create')
            const inboxCreateQuery=`insert into inboxes (id,uid_1,uid_2,timestamp,created_by) values (:0 , :1 , :2 , :3 , :4)`
            const inboxCreateParams=[placeIdResult.data[0].ID,Math.min(data.user_id,data.to),Math.max(data.user_id,data.to),parseInt(Date.now()/1000),data.user_id]
            const inboxCreateResult=await this.query(inboxCreateQuery,inboxCreateParams)
        }

        console.log('from find')
        const fromFindQuery=`select count(*) as count from froms where user_id = :0`
        const fromFindParams=[data.user_id]
        const fromFindResult=await this.query(fromFindQuery,fromFindParams)
        if(fromFindResult.data[0].COUNT===0){
            console.log('create sender')
            const senderCreateQuery=`insert into senders (type) values (:0)`
            const senderCreateParams=['sender']
            await this.query(senderCreateQuery,senderCreateParams)

            console.log('insert id')
            const senderIdQuery=`select max(id) as id from senders`
            const senderIdParams=[]
            const senderIdResult=await this.query(senderIdQuery,senderIdParams)

            console.log('create from')
            const fromCreateQuery=`insert into froms (user_id,sender_id) values (:0 , :1)`
            const fromCreateParams=[data.user_id,senderIdResult.data[0].ID]
            const fromCreateResult=await this.query(fromCreateQuery,fromCreateParams)
        }

        console.log('to find')
        const toFindQuery=`select count(*) as count from tos where user_id = :0`
        const toFindParams=[data.to]
        const toFindResult=await this.query(toFindQuery,toFindParams)
        if(toFindResult.data[0].COUNT===0){
            console.log('reciever create')
            const receiverCreateQuery=`insert into receivers (type) values (:0)`
            const receiverCreateParams=['receiver']
            await this.query(receiverCreateQuery,receiverCreateParams)

            console.log('reciever id')
            const receiverIdQuery=`select max(id) as id from receivers`
            const receiverIdParams=[]
            const receiverIdResult=await this.query(receiverIdQuery,receiverIdParams)

            console.log('create to')
            const toCreateQuery=`insert into tos (user_id,receiver_id) values (:0 , :1)`
            const toCreateParams=[data.to,receiverIdResult.data[0].ID]
            const toCreateResult=await this.query(toCreateQuery,toCreateParams)
        }


        return {
            success:true,
            data:{}
        }
    }


}

module.exports = MessagesRepository
