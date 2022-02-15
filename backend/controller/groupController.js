const { Controller } = require("./base");
const GroupRepository = require('../repository/groupRepository')
const groupRepository=new GroupRepository()

class GroupController extends Controller{
    constructor() {
        super();
    }

    createGroup = async(req, res) => {

        let result = await groupRepository.create(req.body)
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(404).json({
                success: false,
            });
        }
    }

    addMember = async(req, res) => {

        let result = await groupRepository.add(req.body)
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(503).json({
                success: false,
            });
        }
    }

}

module.exports = GroupController
