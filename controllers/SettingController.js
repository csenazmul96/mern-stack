const Setting = require('../models/Settings');
const uploadLogo = async (req, res) => {
    let firstItem = await Setting.findOne().sort({ createdAt: 1 }).exec();
    try {
        const file = req.file;
        if(!firstItem){
            firstItem = new Setting();
        }
        if(file){
            firstItem.logo = file ?  `/storage/${file.filename}` : null;
        }

        if(req.body.intro){
            firstItem.intro = req.body.intro;
        }

        await firstItem.save();
    } catch (error) {
        res.status(500).send('Server error');
    }
    return res.status(200).send({})
}

module.exports = { uploadLogo };