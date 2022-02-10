const { Controller } = require("./base");
const ProfileRepository = require('../repository/profileRepository')
const profileRepository=new ProfileRepository()

class profileController extends Controller{
    constructor() {
        super();
    }

    getProfile = async(req, res) => {

        let result = await profileRepository.list(req.body);
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(404).json({
                success: false,
            });
        }
    }

}

module.exports = profileController