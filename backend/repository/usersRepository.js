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

    list=async ()=>{
        const query='select * from users'
        const params=[]
        var result=await this.query(query,params)
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