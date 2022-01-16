const Repository = require('./connection').Repository

class ItemsRepository extends Repository{
    constructor() {
        super();
    }

    list=async ()=>{
        const query='select * from items'
        const params=[]
        var result=await this.query(query,params)
        return result
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

module.exports = ItemsRepository