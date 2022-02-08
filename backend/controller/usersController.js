const { Controller } = require("./base");
const UsersRepository = require('../repository/usersRepository')
const usersRepository=new UsersRepository()

class UsersController extends Controller{
    constructor() {
        super();
    }

    getList = async(req, res) => {
        let result = await usersRepository.list(req.body);
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(404).json({
                success: false,
            });
        }
    }
}

module.exports = UsersController