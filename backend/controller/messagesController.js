const { Controller } = require("./base");
const MessagesRepository = require('../repository/messagesRepository')
const messagesRepository=new MessagesRepository()

class MessagesController extends Controller {
    constructor() {
        super();
    }

    send = async (req, res) => {

        let result = await messagesRepository.send(req.body);
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(404).json({
                success: false,
            });
        }
    }
    get = async (req, res) => {

        let result = await messagesRepository.getMessages(req.body, req.params.id);
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(404).json({
                success: false,
            });
        }
    }

    getGroup = async (req, res) => {

        let result = await messagesRepository.getGroupMessages(req.body, req.params.id);
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(404).json({
                success: false,
            });
        }
    }
}

module.exports = MessagesController
