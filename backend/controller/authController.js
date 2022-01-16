const { Controller } = require("./base");
const AuthRepository = require('../repository/authRepository')
const authRepository=new AuthRepository()

class AuthController extends Controller{
    constructor() {
        super();
    }

    getList = async(req, res) => {
        let result = await authRepository.list(req.body);
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(404).json({
                success: false,
            });
        }
    }

    reg = async(req, res) => {
        let result = await authRepository.reg(req.body)
        if (result.success) {
            res.status(200).json({
                success:true
            });
        } else {
            res.status(404).json({
                success: false
            });
        }
    }

    login = async(req, res) => {
        let result = await authRepository.login(req.body)
        if (result.success) {
            res.status(200).json({
                token:result.token
            });
        } else {
            res.status(404).json({
                success: false
            });
        }
    }

    changePassword = async(req, res) => {
        let result = await authRepository.changePass(req.body)
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                success: false
            });
        }
    }

    resetPassword = async(req, res) => {
        let result = await authRepository.resetPass(req.body)
        if (result.success) {
            res.status(200).json({
                success:true
            });
        } else {
            res.status(404).json({
                success: false
            });
        }
    }

    delete= async(req,res)=>{
        let result = await authRepository.delete(req.params.id)
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

module.exports = AuthController