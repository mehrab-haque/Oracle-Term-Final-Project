const { Controller } = require("./base");
const ItemsRepository = require('../repository/itemsRepository')
const itemsRepository=new ItemsRepository()

class ItemsController extends Controller{
    constructor() {
        super();
    }

    getList = async(req, res) => {

        let result = await itemsRepository.list();
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(404).json({
                success: false,
            });
        }
    }

    create = async(req,res)=>{
        let result = await itemsRepository.create(req.body)
        if (result.success) {
            res.status(200).json({
                success:true
            });
        } else {
            res.status(404).json({
                success: false,
            });
        }
    }

    update= async(req,res)=>{
        let result = await itemsRepository.update(req.params.id,req.body)
        if (result.success) {
            res.status(200).json({
                success:true
            });
        } else {
            res.status(404).json({
                success: false,
            });
        }
    }

    delete= async(req,res)=>{
        let result = await itemsRepository.delete(req.params.id)
        if (result.success) {
            res.status(200).json({
                success:true
            });
        } else {
            res.status(404).json({
                success: false,
            });
        }
    }
}

module.exports = ItemsController