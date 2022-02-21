const { Controller } = require("./base");
const ReactRepository = require('../repository/reactRepository')
const reactRepository=new ReactRepository()

class ReactController extends Controller{
    constructor() {
        super();
    }

    getList = async(req, res) => {

        let result = await reactRepository.get();
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(404).json({
                success: false,
            });
        }
    }

    getListForAMessage = async(req, res) => {

        let result = await reactRepository.listForMessage(req.body);
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(404).json({
                success: false,
            });
        }
    }

   createReact = async(req, res) => {

        let result = await reactRepository.create(req.body);
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(404).json({
                success: false,
            });
        }
    } 

    
}

module.exports = ReactController;
