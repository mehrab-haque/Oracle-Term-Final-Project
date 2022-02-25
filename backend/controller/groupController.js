const { Controller } = require("./base");
const GroupRepository = require('../repository/groupRepository')
const groupRepository=new GroupRepository()

class GroupController extends Controller{
    constructor() {
        super();
    }

  mergedMessages = async(req, res) => {

        let result = await groupRepository.getMergedMessages(req.body)
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(404).json({
                success: false,
            });
        }
    }



    removedMembers = async(req, res) => {

        let result = await groupRepository.getRemovedMembers(req.body)
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(404).json({
                success: false,
            });
        }
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
  getGroupMembers = async(req, res) => {

        let result = await groupRepository.getMembers(req.body,req.params.id)
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
removeMember = async(req, res) => {

        let result = await groupRepository.remove(req.body)
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
