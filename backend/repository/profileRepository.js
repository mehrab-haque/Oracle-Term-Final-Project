const Repository = require('./connection').Repository

class profileRepository extends Repository {
    constructor() {
        super();
    }

    list = async (data) => {
        const query = 'select id,name,status,image from users where id=:0'
        const params = [data.user_id]
        var result = await this.query(query, params)
        return {

            success: true,
            data: {
                id: result.data[0].ID,
                name: result.data[0].NAME,
                status: result.data[0].STATUS,
                image: result.data[0].IMAGE
            }
        }
    }

    update = async (data) => {
        //const query = 'select id,name,status,image from users where id=:0'
        const query = 'update users set name = :0 , status = :1 , image = :2 where id = :3'
        const params = [data.name,data.status,data.image,data.user_id]
        var result = await this.query(query, params)
        return result
    }


}

module.exports = profileRepository
