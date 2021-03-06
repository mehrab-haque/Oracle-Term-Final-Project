const Repository = require('./connection').Repository
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {socketUserTable, io} = require("../app");


const tokenExpiryDuration=86400

class GroupRepository extends Repository{
    constructor() {
        super();
    }



    getMembers=async (data,id)=>{

        const memberGetQuery=`select users.id,users.name,users.image,members.timestamp from users,members where group_id=:0 and users.id=members.user_id`
        const memberGetParams=[id]
        const memberGetResult=await this.query(memberGetQuery,memberGetParams)
//console.log(memberGetResult);



        return {

		success:true,
                data:memberGetResult.data.map(m=>{return {...m,own:m.ID===data.user_id}})
       }
    }


   remove=async data=>{

 const isAdminQuery=`select count(*) as count from groups where created_by=:0 and id=:1`
        const isAdminParams=[data.user_id,data.groupId]
        const isAdminResult=await this.query(isAdminQuery,isAdminParams)
 //console.log(isAdminResult);
        if(isAdminResult.data[0].COUNT===0)
            return {
                success:false,
                data:{isRemoved:false}
            }



        const memberRemovalQuery=`delete from members where group_id=:0 and user_id=:1`
        const memberRemovalParams=[data.groupId,data.userId]
        const memberRemovalResult=await this.query(memberRemovalQuery,memberRemovalParams)


       var members=await this.getMembers(data,data.groupId)

       members.data.map(m=>{
           if(m.ID+'' in socketUserTable)
               socketUserTable[m.ID+''].map(async sid=>{
                   await io.to(sid).emit('group_remove_member',{
                       ID:data.userId,
                       NAME:data.userName,
                       IMAGE:data.userImage,
                       TIMESTAMP:parseInt(Date.now()/1000),
                       groupId:data.groupId
                   } );
               })
       })

       if(data.userId+'' in socketUserTable)
           socketUserTable[data.userId+''].map(async sid=>{
               await io.to(sid).emit('group_remove_member_single',{
                   groupId:data.groupId
               } );
           })



         return {
                success:true,
                data:{isRemoved:true}
            }
    }

    add=async data=>{


        const isMemberQuery=`select count(*) as count from members where user_id = :0 and group_id = :1`
        const isMemberParams=[data.user_id,data.groupId]
        const isMemberResult=await this.query(isMemberQuery,isMemberParams)

        if(isMemberResult.data[0].COUNT===0)
            return {
                success:false,
                data:{}
            }



        const memberCreateQuery=`insert into members (user_id,group_id,timestamp) values (:0,:1,:2)`
        const memberCreateParams=[data.userId,data.groupId,parseInt(Date.now()/1000)]
        const memberCreateResult=await this.query(memberCreateQuery,memberCreateParams)


        const groupListQuery=`select groups.name,groups.image from groups where groups.id=:0`
        const groupListParams=[data.groupId]
        const groupFindResult=await this.query(groupListQuery,groupListParams)

        var groupResults=await Promise.all(groupFindResult.data.map(async g=>{
            var obj={
                id:data.groupId,
                name:g.NAME,
                image:g.IMAGE,
                type:2
            }

            const groupMessageQuery=`select froms.user_id as sender_id,messages.place_id,messages.msg as msg, senders_receivers.timestamp as timestamp from messages,senders_receivers,froms where messages.place_id = :0 and senders_receivers.message_id = messages.id and senders_receivers.sender_id=froms.sender_id order by timestamp desc`
            const groupMessageParams=[g.GROUP_ID]
            const groupMessageResult=await this.query(groupMessageQuery,groupMessageParams)

            if(groupMessageResult.data.length===0){
                obj['message']= {
                    text:null,
                    timestamp:parseInt(Date.now()/1000)
                }
            }else{
                obj['message']={
                    text:groupMessageResult.data[0].MSG,
                    timestamp:groupMessageResult.data[0].TIMESTAMP,
                    seen:false,
                    own:groupMessageResult.data[0].SENDER_ID===data.user_id
                }
            }

            return obj
        }))

        if(data.userId+'' in socketUserTable)
            socketUserTable[data.userId+''].map(async sid=>{
                await io.to(sid).emit('group_add',groupResults[0] );
            })



        var members=await this.getMembers(data,data.groupId)

        members.data.map(m=>{
            if(m.ID+'' in socketUserTable)
                socketUserTable[m.ID+''].map(async sid=>{
                    await io.to(sid).emit('group_add_member',{
                        ID:data.userId,
                        NAME:data.userName,
                        IMAGE:data.userImage,
                        TIMESTAMP:parseInt(Date.now()/1000),
                        groupId:data.groupId
                    } );
                })
        })




        return memberCreateResult
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

        if(data.user_id+'' in socketUserTable)
            socketUserTable[data.user_id+''].map(async sid=>{
                await io.to(sid).emit('group_add',{
                    id:placeId,
                    name:data.name,
                    image:data.image,
                    type:2,
                    message:{
                        text:null,
                        timestamp:parseInt(Date.now()/1000)
                    }
                } );
            })

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

    members=async data=>{
        const membersQuery=`select user_id from members where group_id=:0`
        const membersParams=[data.groupId]
        const membersResult=await this.query(membersQuery,membersParams)
        return membersResult
    }

}

module.exports=GroupRepository
